import * as FileSystem from 'expo-file-system';

export default async function readFileP(filename: string) {
  const fileUri = FileSystem.documentDirectory + filename;
  const fileInfo = await FileSystem.getInfoAsync(fileUri);

  if (!fileInfo.exists) {
    console.log('File does not exist');
    return null;
  }

  try {
    const fileContent = await FileSystem.readAsStringAsync(fileUri);
    const jsonData = JSON.parse(fileContent);
    return jsonData;
  } catch (error) {
    console.error(error);
    return null;
  }
}
