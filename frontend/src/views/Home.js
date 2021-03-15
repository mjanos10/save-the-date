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
import LoadError from '../components/LoadError';

import * as api from '../services/api';

export default function Home() {
  const { recordId } = useParams();

  const [pageData, setPageData] = useState({
    id: recordId,
    isLoading: true,
    loadError: null,
    canBringPlusOne: false,
    askChildren: false,
    people: [],
    peopleCount: 1,
    multipleChildren: false,
  });

  useEffect(() => {
    async function fetchData() {
      const { success, data, error } = await api.loadData(recordId);
      if (success) {
        setPageData({
          ...data,
          id: recordId,
          isLoading: false,
          loadError: null,
        });
      } else {
        setPageData({
          ...data,
          id: recordId,
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
      {pageData.isLoading === false && pageData.loadError && (
        <LoadError error={pageData.loadError} />
      )}
      {pageData.isLoading === false && !pageData.loadError && (
        <div className="home">
          <Header />
          <Hero />
          <Info />
          <Intro people={pageData.people} peopleCount={pageData.peopleCount} />
          <Form pageData={pageData} />
          <Gallery />
          <Footer />
        </div>
      )}
    </>
  );
}
