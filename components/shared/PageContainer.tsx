import React from 'react';

interface PageContainerProps {
  children: React.ReactNode;
  title: string;
  action?: React.ReactNode;
}

const PageContainer: React.FC<PageContainerProps> = ({ children, title, action }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 lg:ml-64">
      <main className="flex-grow p-4 lg:p-8">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
              <h1 className="text-2xl font-bold mb-4 sm:mb-0">{title}</h1>
              {action}
            </div>
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

export default PageContainer;