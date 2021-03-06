import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Loading from '../components/Loading';
import Hero from '../components/Hero';
import Intro from '../components/Intro';
import Form from '../components/Form';

import * as api from '../services/api';

export default function Home() {
  const [pageData, setPageData] = useState({
    isLoading: true,
    canBringPlusOne: false,
    askChildren: false,
    people: [],
    peopleCount: 1,
    multipleChildren: false,
    loadError: null,
  });

  const { recordId } = useParams();

  useEffect(() => {
    async function fetchData() {
      const { success, data, error } = await api.loadData(recordId);
      if (success) {
        console.log(data);
        setPageData({
          ...data,
          isLoading: false,
          loadError: null,
        });
      } else {
        console.log('error');
        setPageData({
          ...data,
          isLoading: false,
          loadError: error,
        });
      }
    }
    fetchData();
  }, [recordId]);

  return (
    <>
      {pageData.isLoading && <Loading />}
      {!pageData.isLoading && (
        <div className="home">
          <div>
            <label htmlFor="numberOfPeople">Emberek száma</label>
            <input
              id="numberOfPeople"
              type="number"
              value={pageData.peopleCount}
              min="0"
              onChange={(e) =>
                setPageData({
                  ...pageData,
                  peopleCount: parseInt(e.target.value),
                })
              }
            />
          </div>
          <div>
            <label htmlFor="canBringPlusOne">Hozhat +1 főt?</label>
            <input
              id="canBringPlusOne"
              type="checkbox"
              defaultChecked={pageData.canBringPlusOne}
              onChange={(e) =>
                setPageData({ ...pageData, canBringPlusOne: e.target.checked })
              }
            />
          </div>
          <div>
            <label htmlFor="ask-children">Rákérdezzünk a gyerekre?</label>
            <input
              id="ask-children"
              type="checkbox"
              defaultChecked={pageData.askChildren}
              onChange={(e) =>
                setPageData({ ...pageData, askChildren: e.target.checked })
              }
            />
          </div>
          <div>
            <label htmlFor="multiple-children">Több gyereke is van?</label>
            <input
              id="multiple-children"
              type="checkbox"
              defaultChecked={pageData.multipleChildren}
              onChange={(e) =>
                setPageData({ ...pageData, multipleChildren: e.target.checked })
              }
            />
          </div>

          <hr />
          <Hero />
          <Intro people={pageData.people} peopleCount={pageData.peopleCount} />
          <hr />
          <h2>Form</h2>

          <Form
            canBringPlusOne={pageData.canBringPlusOne}
            isPlural={pageData.peopleCount > 1}
            askChildren={pageData.askChildren}
            multipleChildren={pageData.multipleChildren}
          />
        </div>
      )}
    </>
  );
}
