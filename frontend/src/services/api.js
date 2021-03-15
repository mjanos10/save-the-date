const baseUrl = process.env.REACT_APP_BACKEND_URL;

export async function loadData(id) {
  if (localStorage.getItem('mock-api')) {
    return mockGetResponse();
  }
  try {
    const response = await fetch(`${baseUrl}/record/${id}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const body = await response.json();
    console.log('got response', body);

    return {
      success: true,
      data: {
        ...body,
        peopleCount: body.people.length,
      },
    };
  } catch (error) {
    console.error('load error', error);
    return {
      success: false,
      error,
    };
  }
}

export async function saveData(id, data) {
  if (localStorage.getItem('mock-api')) {
    return mockSaveResponse();
  }
  console.log('saving data', id, data);
  try {
    const response = await fetch(`${baseUrl}/${id}`, {
      method: 'POST',
      body: JSON.stringify(data),
    });

    const body = await response.json();
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

async function mockGetResponse(id) {
  await wait(200);
  console.log('mock data loaded');
  return {
    success: true,
    data: {
      id,
      people: [],
      canBringPlusOne: true,
      askChildren: true,
      peopleCount: 1,
      multipleChildren: false,
    },
  };
}

async function mockSaveResponse(id) {
  await wait(200);
  console.log('mock data saved');
  return {
    success: true,
    data: {},
  };
}

function wait(ms) {
  return new Promise((res) => setTimeout(res, ms));
}
