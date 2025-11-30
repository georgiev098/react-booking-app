import supabase from "./supabase";
export async function getCabins() {
  const { data: cabins, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded.");
  }

  return cabins;
}

export async function deleteCabinById(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted.");
  }
  return data;
}

export async function createAndEditCabin(newCabin, editId) {
  const hasImgPath = newCabin.image?.startsWith?.(
    import.meta.env.VITE_SUPABASE_URL
  );

  const imgName = `${Math.random()}-${newCabin.image.name}`.replaceAll("/", "");

  const imgURL = hasImgPath
    ? newCabin.image
    : `${
        import.meta.env.VITE_SUPABASE_URL
      }/storage/v1/object/public/cabin-images/${imgName}`;

  let query = supabase.from("cabins");

  // For create
  if (!editId) {
    query = query.insert([{ ...newCabin, image: imgURL }]);
  }
  // For edit
  if (editId) {
    query = query.update({ ...newCabin, image: imgURL }).eq("id", editId);
  }

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created.");
  }

  // upload image
  const { error: storageErr } = await supabase.storage
    .from("cabin-images")
    .upload(imgName, newCabin.image);
  if (error) {
    // Handle error
  } else {
    // Handle success
  }

  // delete cabin if there was an error uploading image
  if (storageErr) {
    await supabase.from("cabins").delete().eq("id", data.id);
    if (error) {
      console.error(error);
      throw new Error(
        "Cabin image could not be uploaded and cabin was not created."
      );
    }
  }
  return data;
}
