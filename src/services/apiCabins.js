import supabase, { supabaseUrl } from './supabase';

export async function getCabins() {
  const { data, error } = await supabase.from('cabins').select('*');

  if (error) {
    console.error(error);
    throw new Error('cabin could not be loaded');
  }

  return data;
}

export async function createEditCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newCabin.image.name}`.replace('/', '');

  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  //*Create/edit cabin
  let query = supabase.from('cabins');

  //*CREATE
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  //*EDIT
  if (id)
    query = query
      .update({ ...newCabin, image: imagePath })
      .eq('id', id)
      .select();

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error('cabin could not be created');
  }

  //* Upload image

  if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage
    .from('cabin-images')
    .upload(imageName, newCabin.image);

  //! Delete the cabin if there was an error uploading the image
  if (storageError) {
    await supabase.from('cabins').delete().eq('id', data.id);
    throw new Error('Cabin image failed to upload. Cabin was not created');
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from('cabins').delete().eq('id', id);

  if (error) {
    console.error(error);
    throw new Error('cabin could not be deleted');
  }

  return data;
}
