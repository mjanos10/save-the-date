import ky from 'ky';

const api = ky.create({ prefixUrl: process.env.REACT_APP_BACKEND_URL });

export async function loadData(id) {
  try {
    const body = await api.get(`record/${id}`).json();
    console.log('got response', body);

    return {
      success: true,
      data: body,
    };
  } catch (error) {
    console.error('failed to load data', error);
    return {
      success: false,
      error,
    };
  }
}

export async function saveData(id, data) {
  console.log('saving data', id, data);
  try {
    const body = await api.patch(`record/${id}`, { json: data }).json();

    console.log('got response from saving', body);

    return {
      success: true,
      data: body,
    };
  } catch (error) {
    console.error('save error', error);
    return {
      success: false,
      error,
    };
  }
}
