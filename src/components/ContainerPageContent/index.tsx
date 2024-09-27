import { ReactNode } from 'react';

interface ContainerPageContentProps {
  children: ReactNode;
}

function ContainerPageContent({children}: ContainerPageContentProps) {
  return (
    <div className='ContainerPageContent'>
      {children}
    </div>
  )
}

export default ContainerPageContent;
