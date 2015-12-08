/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React from 'react';
import Router from 'react-routing/src/Router';
import http from './core/HttpClient';
import Location from './core/Location';
//import StoreFactory from './stores/StoreFactory';
import App from './components/App';
import ContentPage from './components/ContentPage';
import ContactPage from './components/ContactPage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import MachinesPage from './components/MachinesPage';
import MachineCreationPage from './components/MachineCreationPage';
import ProjectsPage from './components/ProjectsPage';
import NotFoundPage from './components/NotFoundPage';
import ErrorPage from './components/ErrorPage';

const router = new Router(on => {
  on('*', async (state, next) => {
    const component = await next();
    return component && <App context={state.context}>{component}</App>;
  });

  on('/contact', async () => {
    return <ContactPage />;
  });

  on('/login', async (state) => {
    if (state.user.isAuthenticated) {
      Location.push('/');
      return null;
    }
    return <LoginPage />;
  });

  on('/logout', async (state) => {
    if (!state.user.isAuthenticated) {
      Location.push('/');
      return null;
    }

    state.context.flux.getActions('accountActions').logout();
    return null;
  });

  on('/register', async (state) => {
    if (state.user.isAuthenticated) {
      Location.push('/');
      return null;
    }
    return <RegisterPage />;
  });

  on('/machines', async (state) => {
    if (!state.user.isAuthenticated) {
      Location.push('/login');
      return null;
    }
    return <MachinesPage />;
  });

  on('/createMachine', async (state) => {
    if (!state.user.isAuthenticated) {
      Location.push('/login');
      return null;
    }
    return <MachineCreationPage />;
  });

  on('/projects', async (state) => {
    if (!state.user.isAuthenticated) {
      Location.push('/login');
      return null;
    }
    return <ProjectsPage />;
  });

  on('*', async (state) => {
    const content = await http.get(`/api/content?path=${state.path}`);
    return content && <ContentPage {...content} />;
  });

  on('error', (state, error) => state.statusCode === 404 ?
    <App context={state.context} error={error}><NotFoundPage /></App> :
    <App context={state.context} error={error}><ErrorPage /></App>
  );
});

export default router;
