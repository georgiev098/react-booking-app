import supabase from "./supabase";

export async function login({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getCurrUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session) {
    return null;
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
}

export async function logout() {
  let { error } = await supabase.auth.signOut();
  return error;
}

export async function signUp({ email, password, fullName }) {
  let { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });

  return { data, error };
}

export async function updateUser({ password, fullName, avatar }) {
  // update password || fullName
  let updateData = {};

  if (password) {
    updateData.password = password;
  }

  if (fullName) {
    updateData.data = {
      fullName,
    };
  }

  const { data, error: updateUserErr } = await supabase.auth.updateUser(
    updateData
  );
  if (updateUserErr) {
    console.error(updateUserErr.message);
    throw new Error(updateUserErr.message);
  }
  if (!avatar) {
    return data;
  }

  // Upload avatar img
  const fileName = `avatar-${data.user.id}-${Math.random()}`;

  const { error: uploadAvatarErr } = await supabase.storage
    .from("user-avatars")
    .upload(fileName, avatar);
  if (uploadAvatarErr) {
    console.error(uploadAvatarErr.message);
    throw new Error(uploadAvatarErr.message);
  }

  // use avatar to update user
  const { data: publicURL } = supabase.storage
    .from("user-avatars")
    .getPublicUrl(fileName);

  const { data: updatedUser, error: updateAvatarErr } =
    await supabase.auth.updateUser({
      data: { avatar: publicURL.publicUrl },
    });
  if (updateAvatarErr) {
    console.error(updateAvatarErr.message);
    throw new Error(updateAvatarErr.message);
  }
  return updatedUser;
}
