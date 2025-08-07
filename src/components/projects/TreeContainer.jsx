import React, { useState } from 'react';
import { 
  ExpandIcon, 
  ShrinkIcon, 
  RefreshCw
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import TreeNode from './TreeNode';

const TreeContainer = ({ 
  title = "Tree Structure",
  data = [],
  onNodeClick,
  onRefresh,
  expandControls = true,
  className = ""
}) => {

  console.log("From Tree container", data);
  const [expandedAll, setExpandedAll] = useState(false);

  const handleExpandAll = () => {
    setExpandedAll(!expandedAll);
    // This would need to be implemented with a context or state management
    // For now, it's just a toggle state
  };

  const handleRefresh = () => {
    if (onRefresh) {
      onRefresh();
    }
  };

  if (!data || data.length === 0) {
    return (
      <div className={`bg-white border rounded-lg p-6 ${className}`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          {onRefresh && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleRefresh}
              className="gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </Button>
          )}
        </div>
        <div className="text-center py-8 text-gray-500">
          <p>No data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white border rounded-lg ${className}`}>
      {/* Header */}
      <div className="p-4 border-b bg-gray-50 rounded-t-lg">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">{title}</h3>
          <div className="flex items-center gap-2">
            {expandControls && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleExpandAll}
                className="gap-2"
              >
                {expandedAll ? (
                  <>
                    <ShrinkIcon className="w-4 h-4" />
                    Collapse All
                  </>
                ) : (
                  <>
                    <ExpandIcon className="w-4 h-4" />
                    Expand All
                  </>
                )}
              </Button>
            )}
            {onRefresh && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleRefresh}
                className="gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Refresh
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Tree Content */}
      <div className="p-4">
        <div className="space-y-3">
          {data.map((node, index) => (
            <TreeNode
              key={node.id || index}
              node={node}
              level={0}
              onNodeClick={onNodeClick}
              isExpandedByDefault={true}
              expandedAll={expandedAll}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TreeContainer;