import "./home.css";
import React from 'react';
import axios from 'axios';
//import { URLDevelopment } from '../../../helpers/url';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Chart from "../../../components/chart/LineChart";
//import WidgetLg from "../../../components/widgetLg/WidgetLg";
import { useEffect, useMemo, useState } from "react";
import Sidebar from "../../../components/sidebar/Sidebar";

const Home = () => {

  const [userStats, setUserStats] = useState([]);

  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await axios.get(`/api/users/stats`);
        //const res = await userRequest.get("/users/stats");
        res.data.map((item) =>
          setUserStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], "Active User": item.total },
          ])
        );
      } catch {}
    };
    getStats();
  }, [MONTHS]);

  return (
  <>
  
    <div className="containerr">
        <Sidebar />
      <div className="home">
        
        <Chart
          data={userStats}
          title="Analyse des utilisateurs"
          grid
          dataKey="Utilisateur Active"
        />
        <div className="homeWidgets">
          
          
        </div>
      </div>


    </div>
  </>

  );
}

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuthenticated,
});
export default connect(mapStateToProps)(withRouter(Home));
