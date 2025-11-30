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

export async function createCabin(newCabin) {
  const imgName = `${Math.random()}-${newCabin.image.name}`.replace("/", "");
  const imgURL = `${
    import.meta.env.VITE_SUPABASE_URL
  }/storage/v1/object/public/cabin-images/${imgName}`;

  const { data, error } = await supabase
    .from("cabins")
    .insert([{ ...newCabin, image: imgURL }])
    .select();

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
