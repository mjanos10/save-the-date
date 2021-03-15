import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Loading from '../components/Loading';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Intro from '../components/Intro';
import Info from '../components/Info';
import Form from '../components/Form';
import Footer from '../components/Footer';
import Gallery from '../components/Gallery';

import * as api from '../services/api';

export default function Home() {
  const [pageData, setPageData] = useState({
    isLoading: true,
    loadError: null,
    canBringPlusOne: false,
    askChildren: false,
    people: [],
    peopleCount: 1,
    multipleChildren: false,
    submitLoading: false,
    submitError: false,
  });

  const { recordId } = useParams();

  useEffect(() => {
    async function fetchData() {
      const { success, data, error } = await api.loadData(recordId);
      if (success) {
        setPageData({
          ...data,
          isLoading: false,
          loadError: null,
        });
      } else {
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
      {pageData.isLoading ? (
        <Loading />
      ) : (
        <div className="home">
          <Header />
          <Hero />
          <Info />
          <Intro people={pageData.people} peopleCount={pageData.peopleCount} />
          <Form
            canBringPlusOne={pageData.canBringPlusOne}
            isPlural={pageData.peopleCount > 1}
            askChildren={pageData.askChildren}
            multipleChildren={pageData.multipleChildren}
          />
          <Gallery />
          <Footer />
        </div>
      )}
    </>
  );
}
