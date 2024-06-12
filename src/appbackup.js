import React, { useEffect, useState } from 'react';
import DropdownTreeSelect from 'react-dropdown-tree-select';
import 'react-dropdown-tree-select/dist/styles.css';

const domainData = {
  "description": null,
  "display": true,
  "error": false,
  "data": [
    { "id": 2023799824, "name": "self-CarE1" },
    { "id": 2023799825, "name": "Neuromotor Processes" },
    { "id": 2023799826, "name": "Gross Motor" },
    { "id": 2023799827, "name": "Fine Motor/Visual Motor" },
    { "id": 2023799828, "name": "Sensory Processing" },
    { "id": 2023799829, "name": "Social Emotional/Play" },
    { "id": 2023799830, "name": "Self-Care" }
  ]
};

const longTermData = {
  2023799824: {
    "description": null,
    "display": true,
    "error": false,
    "data": [
      { "id": 412583201, "name": "Test supriya" },
      { "id": 412583202, "name": "Long term goal 1" },
      { "id": 412583204, "name": "Test supriya" }
    ]
  },
  2023799825: {
    "description": null,
    "display": true,
    "error": false,
    "data": [
      { "id": 412583202, "name": "Test supriya 2" },
      { "id": 412583202, "name": "Long term goal 2" },
      { "id": 412583204, "name": "Test supriya2" }
    ]
  }
};

const shortTermData = {
  412583201: [
    { "id": 125, "name": "tanya1" }
  ],
  412583202: [
    { "id": 125, "name": "tanya2" }
  ]
};

const transformData = (domains, longTerms, shortTerms) => {
  return domains.map(domain => {
    const longTermGoals = longTerms[domain.id]?.data.map(ltg => {
      const shortTermGoals = shortTerms[ltg.id]?.map(stg => ({
        label: stg.name,
        value: stg.id
      })) || [];
      return {
        label: ltg.name,
        value: ltg.id,
        children: shortTermGoals
      };
    }) || [];

    return {
      label: domain.name,
      value: domain.id,
      children: longTermGoals
    };
  });
};

const App = () => {
  const [treeData, setTreeData] = useState([]);

  useEffect(() => {
    const data = transformData(domainData.data, longTermData, shortTermData);
    setTreeData(data);
  }, []);

  const handleChange = (currentNode, selectedNodes) => {
    console.log('currentNode:', currentNode);
    console.log('selectedNodes:', selectedNodes);
  };

  return (
    <div>
      <DropdownTreeSelect data={treeData} onChange={handleChange} />
    </div>
  );
};

export default App;
