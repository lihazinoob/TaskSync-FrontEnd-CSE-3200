import React, { useState } from 'react';
import { 
  ChevronDown, 
  ChevronRight, 
  Folder, 
  FolderOpen, 
  CheckCircle, 
  Circle, 
  Calendar, 
  User,
  FileText
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

const TreeNode = ({ 
  node, 
  level = 0, 
  onNodeClick, 
  isExpandedByDefault = true,
  expandedAll = false
}) => {
  const [isExpanded, setIsExpanded] = useState(isExpandedByDefault);

  // Update expansion state when expandedAll changes
  React.useEffect(() => {
    if (expandedAll !== undefined) {
      setIsExpanded(expandedAll);
    }
  }, [expandedAll]);

  const toggleExpanded = (e) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  const handleNodeClick = (e) => {
    e.stopPropagation();
    if (onNodeClick) {
      onNodeClick(node);
    }
  };

  // Get appropriate icon based on node type and status
  const getNodeIcon = () => {
    switch (node.type) {
      case 'project':
        return isExpanded ? 
          <FolderOpen className="w-5 h-5 text-blue-600" /> : 
          <Folder className="w-5 h-5 text-blue-600" />;
      case 'task':
        return node.status ? 
          <CheckCircle className="w-4 h-4 text-green-600" /> : 
          <Circle className="w-4 h-4 text-amber-500" />;
      case 'subtask':
        // ✅ Use smaller icons for deeper nesting levels
        const depth = node.depth || 0;
        const iconSize = depth > 1 ? "w-3 h-3" : "w-4 h-4";
        return node.status ? 
          <CheckCircle className={`${iconSize} text-green-600`} /> : 
          <Circle className={`${iconSize} text-amber-500`} />;
      default:
        return <FileText className="w-4 h-4 text-gray-500" />;
    }
  };

  // Get status badge
  const getStatusBadge = () => {
    if (node.type === 'project') return null;
    
    return node.status ? (
      <Badge className="bg-green-50 text-green-700 border-green-200 text-xs">
        Done
      </Badge>
    ) : (
      <Badge className="bg-amber-50 text-amber-700 border-amber-200 text-xs">
        Todo
      </Badge>
    );
  };

  // ✅ Updated to handle subtasks having subtasks
  const getChildrenCount = () => {
    if (node.type === 'project' && node.tasks) return node.tasks.length;
    if (node.type === 'task' && node.subtasks) return node.subtasks.length;
    if (node.type === 'subtask' && node.subtasks) return node.subtasks.length; // ✅ Subtasks can have subtasks
    return 0;
  };

  // ✅ Updated to handle subtasks having subtasks
  const hasChildren = () => {
    if (node.type === 'project') return node.tasks && node.tasks.length > 0;
    if (node.type === 'task') return node.subtasks && node.subtasks.length > 0;
    if (node.type === 'subtask') return node.subtasks && node.subtasks.length > 0; // ✅ Subtasks can have subtasks
    return false;
  };

  // ✅ Updated to handle subtasks having subtasks
  const getChildren = () => {
    if (node.type === 'project') return node.tasks || [];
    if (node.type === 'task') return node.subtasks || [];
    if (node.type === 'subtask') return node.subtasks || []; // ✅ Return nested subtasks
    return [];
  };

  // ✅ Enhanced background class with depth-based styling for better visual hierarchy
  const getBackgroundClass = () => {
    switch (node.type) {
      case 'project':
        return 'bg-blue-50 border-blue-200 hover:bg-blue-100';
      case 'task':
        return 'bg-gray-50 border-gray-200 hover:bg-gray-100';
      case 'subtask':
        // ✅ Different colors based on depth for better visual hierarchy
        const depth = node.depth || 0;
        if (depth === 0) return 'bg-orange-50 border-orange-200 hover:bg-orange-100';
        if (depth === 1) return 'bg-yellow-50 border-yellow-200 hover:bg-yellow-100';
        if (depth === 2) return 'bg-purple-50 border-purple-200 hover:bg-purple-100';
        if (depth === 3) return 'bg-pink-50 border-pink-200 hover:bg-pink-100';
        return 'bg-indigo-50 border-indigo-200 hover:bg-indigo-100'; // For deeper nesting
      default:
        return 'bg-white border-gray-200 hover:bg-gray-50';
    }
  };

  // ✅ Get border color for depth indication
  const getBorderColor = () => {
    if (node.type !== 'subtask') return 'none';
    
    const depth = node.depth || 0;
    const colors = ['#f97316', '#eab308', '#a855f7', '#ec4899', '#6366f1']; // orange, yellow, purple, pink, indigo
    return depth > 0 ? `3px solid ${colors[depth % colors.length]}` : 'none';
  };

  const childrenCount = getChildrenCount();
  const children = getChildren();

  return (
    <div className="tree-node">
      {/* Node Content */}
      <div 
        className={`
          flex items-center p-3 rounded-lg border cursor-pointer transition-all duration-200
          ${getBackgroundClass()}
        `}
        onClick={handleNodeClick}
        style={{ 
          marginLeft: `${level * 20}px`,
          borderLeft: getBorderColor() // ✅ Visual indicator for nesting depth
        }}
      >
        {/* Expand/Collapse Button */}
        {hasChildren() && (
          <button
            onClick={toggleExpanded}
            className="mr-3 p-1 hover:bg-white rounded-sm transition-colors"
            aria-label={isExpanded ? 'Collapse' : 'Expand'}
          >
            {isExpanded ? (
              <ChevronDown className="w-4 h-4 text-gray-600" />
            ) : (
              <ChevronRight className="w-4 h-4 text-gray-600" />
            )}
          </button>
        )}

        {/* Icon */}
        <div className="mr-3 flex-shrink-0">
          {getNodeIcon()}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h4 className={`
              truncate font-medium
              ${node.type === 'project' ? 'text-blue-900 text-lg' : ''}
              ${node.type === 'task' ? 'text-gray-900' : ''}
              ${node.type === 'subtask' ? 
                `text-gray-800 ${(node.depth || 0) > 1 ? 'text-xs' : 'text-sm'}` : 
                ''}
            `}>
              {node.title || node.name}
              {/* ✅ Show depth indicator for debugging/clarity */}
              {node.type === 'subtask' && node.depth !== undefined && (
                <span className="ml-1 text-xs text-gray-400 font-normal">
                  (L{node.depth})
                </span>
              )}
            </h4>
            {getStatusBadge()}
          </div>

          {/* Additional Info */}
          <div className="flex items-center gap-4 text-xs text-gray-500">
            {node.dueDate && (
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                <span>Due: {format(new Date(node.dueDate), 'MMM dd')}</span>
              </div>
            )}
            
            {node.assignedToName && node.assignedToName !== 'Unassigned' && (
              <div className="flex items-center gap-1">
                <User className="w-3 h-3" />
                <span>@{node.assignedToName}</span>
              </div>
            )}
          </div>
        </div>

        {/* Count Badge */}
        {childrenCount > 0 && (
          <div className="ml-2 px-2 py-1 bg-white rounded-full text-xs font-medium text-gray-600 border">
            {childrenCount}
          </div>
        )}
      </div>

      {/* ✅ Children - This will render nested subtasks recursively */}
      {hasChildren() && isExpanded && (
        <div className="tree-children mt-2 space-y-2">
          {children.map((child, index) => (
            <TreeNode
              key={child.id || index}
              node={child}
              level={level + 1}
              onNodeClick={onNodeClick}
              isExpandedByDefault={level < 3} // ✅ Expand first 3 levels by default
              expandedAll={expandedAll}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TreeNode;