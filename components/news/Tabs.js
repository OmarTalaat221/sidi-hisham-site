import { useEffect, useState } from 'react';
import { Tab } from '@headlessui/react';
// import data from "./Data.json";
// import pathHome from "../../../public/images/pathHome.png";
import OptimizedImage from "@/components/common/OptimizedImage";
import NewsCarousel from './NewsCarousel';
import NewsService from '../../services/newsService';
import axios from 'axios';
import ActivitiesCarousel from './ActivitiesCarousel';
import { useSelector } from 'react-redux';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Tabs() {
  let [categories] = useState({
    'فعاليات سورية': [
      {
        id: 1,
        title: 'Does drinking coffee make you smarter?',
        date: '5h ago',
        commentCount: 5,
        shareCount: 2,
      },
    ],
    'فعاليات عالمية': [
      {
        id: 1,
        title: 'Does drinking coffee make you smarter?',
        date: '5h ago',
        commentCount: 5,
        shareCount: 2,
      },
    ],
    اخبار: [],
  });
  let [categoriesB] = useState({
    'Syrian Events': [
      {
        id: 1,
        title: 'Does drinking coffee make you smarter?',
        date: '5h ago',
        commentCount: 5,
        shareCount: 2,
      },
    ],
    'International Events': [
      {
        id: 1,
        title: 'Does drinking coffee make you smarter?',
        date: '5h ago',
        commentCount: 5,
        shareCount: 2,
      },
    ],
    News: [],
  });

  // Get news
  const [news, setNews] = useState([]);
  const getNews = async (e) => {
    await axios
      .get('https://api.sedihisham.com/news/findall')
      .then((response) => {
        setNews(
          response.data && response.data?.length
            ? response.data?.reverse()
            : response.data
        );
        // console.log("Branches " + JSON.stringify(branches));
      });
  };

  // Get activities : filter by category ok
  const [activities, setActivities] = useState([]);
  const getActivities = async (e) => {
    await axios
      .get('https://api.sedihisham.com/activities/findall')
      .then((response) => {
        setActivities(
          response.data && response.data?.length
            ? response.data?.reverse()
            : response.data
        );
        // console.log("Branches " + JSON.stringify(branches));
      });
  };

  useEffect(() => {
    getNews();
    getActivities();
  }, []);

  const { local } = useSelector((state) => state.language);

  return (
    <div className=" mt-10 z-60 max-w-screen md:mx-28 px-2 sm:px-0">
      <div className="flex justify-center">
        <h1 className="font-arabicBold text-2xl opacity-75 my-1">
          {local === 'ar' ? 'فعاليات سيدي هشام' : 'Sedi Hisham News and Events'}
        </h1>
      </div>

      <Tab.Group>
        <div
          className="flex items-center justify-center"
          style={{ position: 'relative' }}
        >
          <Tab.List className="flex mt-10 -mb-10 space-x-5 w-full md:w-[600px] rounded-xl justify-center items-center p-5">
            {Object.keys(local === 'ar' ? categories : categoriesB).map(
              (category) => (
                <Tab
                  key={category}
                  className={({ selected }) =>
                    classNames(
                      'w-full rounded-lg py-2.5  text-sm font-arabicLight leading-5 ',
                      selected ? 'bg-[#D40017] text-white ' : '  text-black'
                    )
                  }
                >
                  {category}
                </Tab>
              )
            )}
          </Tab.List>
        </div>

        <Tab.Panels className="mt-2 ">
          {/* {Object.values(categories).map((posts, idx) => ( */}
          <Tab.Panel
            key={1}
            className={classNames(
              'rounded-xl bg-white p-3',
              'ring-white ring-opacity-60 ring-offset-2  focus:outline-none focus:ring-2'
            )}
          >
            <ActivitiesCarousel
              local={local}
              activities={activities.filter(
                (activity) => activity.category === 'national'
              )}
            />
          </Tab.Panel>
          <Tab.Panel
            key={2}
            className={classNames(
              'rounded-xl bg-white p-3',
              'ring-white ring-opacity-60 ring-offset-2  focus:outline-none focus:ring-2'
            )}
          >
            <ActivitiesCarousel
              local={local}
              activities={activities.filter(
                (activity) => activity.category === 'international'
              )}
            />
          </Tab.Panel>
          <Tab.Panel
            key={3}
            className={classNames(
              'rounded-xl bg-white p-3',
              'ring-white ring-opacity-60 ring-offset-2  focus:outline-none focus:ring-2'
            )}
          >
            <NewsCarousel local={local} news={news} />
          </Tab.Panel>
          {/* ))} */}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
