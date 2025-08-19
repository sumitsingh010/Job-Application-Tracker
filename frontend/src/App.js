/**
 * Job Application Tracker - React Frontend
 * Created by: Sumit Singh Sengar
 * Description: Modern React application for tracking job applications with analytics
 */

import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import KanbanBoard from './components/KanbanBoard';
import Analytics from './components/Analytics';
import ApplicationForm from './components/ApplicationForm';
import { ApplicationProvider } from './context/ApplicationContext';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('kanban');
  const [showForm, setShowForm] = useState(false);

  return (
    <ApplicationProvider>
      <div className="App">
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#363636',
              color: '#fff',
            },
          }}
        />
        
        <Navbar 
          currentView={currentView} 
          setCurrentView={setCurrentView}
          onAddApplication={() => setShowForm(true)}
        />
        
        <main className="main-content">
          {currentView === 'kanban' && (
            <KanbanBoard onAddApplication={() => setShowForm(true)} />
          )}
          {currentView === 'analytics' && <Analytics />}
        </main>

        {showForm && (
          <ApplicationForm 
            onClose={() => setShowForm(false)}
            onSubmit={() => setShowForm(false)}
          />
        )}
      </div>
    </ApplicationProvider>
  );
}

export default App;
