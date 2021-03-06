export async function loadData(id) {
  if (localStorage.getItem('mock-api')) {
    return mockGetResponse();
  }
  try {
    const response = await fetch(
      `https://ui0ecoavac.execute-api.eu-central-1.amazonaws.com/${id}`
    );
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
    console.error(error);
    return {
      success: false,
      error,
    };
  }
}

async function mockGetResponse(id) {
  await wait(200);
  console.log('data loaded');
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

function wait(ms) {
  return new Promise((res) => setTimeout(res, ms));
}
