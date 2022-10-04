import React from 'react';
import { DashboardProvider } from '../../lib/context/Dashboard';
import { DashFooter } from '../footer/DashFooter';
import DashHeader from '../header/DashHeader';
import ConfigListCom from './components/ConfigList';

const Dashboard = () => (
  <>
    <DashboardProvider>
      <div className="layout">
        <div className="row header">
          <DashHeader />
        </div>
        <div className="row content">
          <ConfigListCom />
        </div>
        <div className="row footer">
          <DashFooter />
        </div>
      </div>
    </DashboardProvider>
  </>
);

export default Dashboard;
