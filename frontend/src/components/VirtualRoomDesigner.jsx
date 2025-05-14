import React, { useState } from 'react';
import './VirtualRoomDesigner.scss';

const VirtualRoomDesigner = () => {
  const [roomType, setRoomType] = useState('living-room');
  const [wallColor, setWallColor] = useState('#f5f5f5');
  const [furnitureStyle, setFurnitureStyle] = useState('modern');
  const [floorType, setFloorType] = useState('hardwood');
  const [budget, setBudget] = useState(5000);
  
  const handleBudgetChange = (e) => {
    setBudget(e.target.value);
  };
  
  const applyChanges = () => {
    // In a real implementation, this would update the 3D preview
    alert('In a real implementation, the 3D preview would update with your selected options.');
  };
  
  const saveDesign = () => {
    // In a real implementation, this would save the current design
    alert('Design saved! In a real implementation, this would save your current configuration.');
  };
  
  return (
    <section className="room-configurator" id="room-configurator">
      <div className="container">
        <div className="section-title">
          <h2>Virtual Room Designer</h2>
          <p>Design your space in 3D and visualize how our products will look in your home</p>
        </div>
        
        <div className="row">
          <div className="col-lg-8">
            <div className="configurator-preview">
              <img 
                src="/images/space.jpg" 
                alt="3D Room Preview" 
                className="img-fluid"
                style={{
                  opacity: roomType === 'living-room' ? 1 : 0.8,
                  filter: `brightness(${furnitureStyle === 'modern' ? 1 : 0.9})`
                }}
              />
            </div>
          </div>
          
          <div className="col-lg-4">
            <div className="configurator-controls">
              <div className="configurator-section">
                <h4>Room Type</h4>
                <select 
                  className="form-select mb-3"
                  value={roomType}
                  onChange={(e) => setRoomType(e.target.value)}
                >
                  <option value="living-room">Living Room</option>
                  <option value="bedroom">Bedroom</option>
                  <option value="dining-room">Dining Room</option>
                  <option value="kitchen">Kitchen</option>
                  <option value="home-office">Home Office</option>
                </select>
              </div>
              
              <div className="configurator-section">
                <h4>Wall Color</h4>
                <div className="color-options">
                  {['#f5f5f5', '#e0e0e0', '#d6eaf8', '#fadbd8', '#e8f8f5'].map((color) => (
                    <div 
                      key={color}
                      className={`color-option ${wallColor === color ? 'active' : ''}`}
                      style={{ backgroundColor: color }}
                      onClick={() => setWallColor(color)}
                    ></div>
                  ))}
                </div>
              </div>
              
              <div className="configurator-section">
                <h4>Furniture Style</h4>
                <select 
                  className="form-select mb-3"
                  value={furnitureStyle}
                  onChange={(e) => setFurnitureStyle(e.target.value)}
                >
                  <option value="modern">Modern</option>
                  <option value="scandinavian">Scandinavian</option>
                  <option value="industrial">Industrial</option>
                  <option value="mid-century">Mid-Century</option>
                  <option value="minimalist">Minimalist</option>
                </select>
              </div>
              
              <div className="configurator-section">
                <h4>Floor Type</h4>
                <select 
                  className="form-select mb-3"
                  value={floorType}
                  onChange={(e) => setFloorType(e.target.value)}
                >
                  <option value="hardwood">Hardwood</option>
                  <option value="tile">Tile</option>
                  <option value="carpet">Carpet</option>
                  <option value="concrete">Concrete</option>
                  <option value="vinyl">Vinyl</option>
                </select>
              </div>
              
              <div className="configurator-section">
                <h4>Budget</h4>
                <div className="range">
                  <input 
                    type="range" 
                    className="form-range" 
                    min="500" 
                    max="10000" 
                    step="500"
                    value={budget}
                    onChange={handleBudgetChange}
                    id="budgetRange"
                  />
                  <div className="d-flex justify-content-between">
                    <span>$500</span>
                    <span id="budgetValue">${budget.toLocaleString()}</span>
                    <span>$10,000</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-4">
                <button 
                  className="btn btn-primary w-100 mb-3"
                  onClick={applyChanges}
                >
                  Apply Changes
                </button>
                <button 
                  className="btn btn-outline-secondary w-100"
                  onClick={saveDesign}
                >
                  Save Design
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VirtualRoomDesigner;