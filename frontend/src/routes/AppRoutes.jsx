import React from 'react';
import { useAffiliate } from '../hooks/useAffiliate';
import Dashboard from '../pages/Dashboard';
import Products from '../pages/Products';
import Campaigns from '../pages/Campaigns';
import ContentStudio from '../pages/ContentStudio';
import ContentCalendar from '../pages/ContentCalendar';
import SocialAccounts from '../pages/SocialAccounts';
import EmailMarketing from '../pages/EmailMarketing';
import Analytics from '../pages/Analytics';

export default function AppRoutes() {
  const { activePage } = useAffiliate();

  switch (activePage) {
    case 'dashboard':
      return <Dashboard />;
    case 'products':
      return <Products />;
    case 'campaigns':
      return <Campaigns />;
    case 'studio':
      return <ContentStudio />;
    case 'calendar':
      return <ContentCalendar />;
    case 'accounts':
      return <SocialAccounts />;
    case 'email':
      return <EmailMarketing />;
    case 'analytics':
      return <Analytics />;
    default:
      return <Dashboard />;
  }
}
