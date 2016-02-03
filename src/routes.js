/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React from 'react';
import Router from 'react-routing/src/Router';
import http from './core/HttpClient';
import App from './components/App';
import ContentPage from './components/ContentPage';
import ContactPage from './components/ContactPage';
import RegisterPage from './components/RegisterPage';
import LoginPage from './components/LoginPage';
import MachinesPage from './components/Machine/MachinesPage';
import MachineCreationPage from './components/Machine/MachineCreationPage';
import MachineUpdationPage from './components/Machine/MachineUpdationPage';
import MachineAccessesPage from './components/Machine/MachineAccessesPage';
import MachineAccessCreationPage from './components/Machine/MachineAccessCreationPage';
import ProjectsPage from './components/Project/ProjectsPage';
import ProjectCreationPage from './components/Project/ProjectCreationPage';
import ProjectUpdationPage from './components/Project/ProjectUpdationPage';
import ProjectAccessesPage from './components/Project/ProjectAccessesPage';
import ProjectAccessCreationPage from './components/Project/ProjectAccessCreationPage';
import NotFoundPage from './components/NotFoundPage';
import ErrorPage from './components/ErrorPage';
import NullComponent from './components/NullComponent';

const authenticated = (state, next) => {
  if (!state.user.isAuthenticated) {
    state.context.flux.redirect('/login');
    return <NullComponent />; // HACK for preventing next handlers and the render
  }
  return next();
};

const notAuthenticated = (state, next) => {
  if (state.user.isAuthenticated) {
    state.context.flux.redirect('/');
    return <NullComponent />; // HACK for preventing next handlers and the render
  }
  return next();
};

const router = new Router(on => {
  on('*', async (state, next) => {
    const component = await next();
    if (!component) {
      return false; // continue with next global or error handler
    } else if (component.type === NullComponent) {
      return component; // skip render
    }
    return <App context={state.context}>{component}</App>;
  });

  on('/contact', async () => {
    return <ContactPage />;
  });

  on('/register', notAuthenticated, async () => {
    return <RegisterPage />;
  });

  on('/login', notAuthenticated, async () => {
    return <LoginPage />;
  });

  on('/logout', authenticated, async (state) => {
    state.context.flux.getActions('accountActions').logout();
    return <NullComponent />;
  });

  on('/machines', authenticated, async () => {
    return <MachinesPage />;
  });

  on('/createMachine', authenticated, async () => {
    return <MachineCreationPage />;
  });

  on('/updateMachine/:id', authenticated, async (state) => {
    return <MachineUpdationPage id={state.params.id} />;
  });

  on('/machineAccesses/:machineId', authenticated, async (state) => {
    return <MachineAccessesPage machineId={state.params.machineId} />;
  });

  on('/createMachineAccess/:machineId', authenticated, async (state) => {
    return <MachineAccessCreationPage machineId={state.params.machineId} />;
  });

  on('/projects', authenticated, async () => {
    return <ProjectsPage />;
  });

  on('/createProject', authenticated, async () => {
    return <ProjectCreationPage />;
  });

  on('/updateProject/:id', authenticated, async (state) => {
    return <ProjectUpdationPage id={state.params.id} />;
  });

  on('/projectAccesses/:projectId', authenticated, async (state) => {
    return <ProjectAccessesPage projectId={state.params.projectId} />;
  });

  on('/createProjectAccess/:projectId', authenticated, async (state) => {
    return <ProjectAccessCreationPage projectId={state.params.projectId} />;
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
