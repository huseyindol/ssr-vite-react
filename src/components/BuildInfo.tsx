import React, { useEffect, useState } from 'react';

interface BuildInfoProps {
  showBuildId?: boolean;
  position?: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';
  className?: string;
}

/**
 * A component to display build information in the UI
 * Useful for checking which version of the app is running
 */
const BuildInfo: React.FC<BuildInfoProps> = ({ 
  showBuildId = true,
  position = 'bottom-right',
  className = ''
}) => {
  const [buildId, setBuildId] = useState<string>('');
  
  useEffect(() => {
    // Get build ID from meta tag
    const buildMeta = document.querySelector('meta[name="build-id"]');
    const buildVersion = document.querySelector('meta[name="build-version"]');
    
    if (buildMeta && buildMeta.getAttribute('content')) {
      setBuildId(buildMeta.getAttribute('content') || '');
    } else if (buildVersion && buildVersion.getAttribute('content')) {
      setBuildId(buildVersion.getAttribute('content') || '');
    }
  }, []);
  
  if (!buildId || !showBuildId) return null;
  
  // Position styles
  const positionStyles: Record<string, string> = {
    'bottom-right': 'bottom-2 right-2',
    'bottom-left': 'bottom-2 left-2',
    'top-right': 'top-2 right-2',
    'top-left': 'top-2 left-2'
  };
  
  return (
    <div className={`fixed ${positionStyles[position]} px-2 py-1 text-xs bg-gray-800 text-gray-300 rounded-md opacity-70 hover:opacity-100 transition-opacity ${className}`}>
      Build: {buildId}
    </div>
  );
};

export default BuildInfo; 