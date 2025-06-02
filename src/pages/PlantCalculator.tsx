
import { useState } from "react";
import { Calculator, Sprout } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navigation from "@/components/Navigation";

const PlantCalculator = () => {
  const [plantName, setPlantName] = useState("Plants");
  const [horizontalDistance, setHorizontalDistance] = useState("");
  const [verticalDistance, setVerticalDistance] = useState("");
  const [distanceUnit, setDistanceUnit] = useState("feet");
  const [landArea, setLandArea] = useState("");
  const [landAreaUnit, setLandAreaUnit] = useState("acres");
  const [costPerPlant, setCostPerPlant] = useState("");
  const [results, setResults] = useState(null);

  // Unit conversion functions
  const convertToSquareFeet = (area, unit) => {
    const conversions = {
      'acres': 43560,
      'square feet': 1,
      'square meters': 10.7639,
      'gunta': 1089
    };
    return area * conversions[unit];
  };

  const convertDistanceToFeet = (distance, unit) => {
    if (unit === 'meters') return distance * 3.28084;
    return distance; // already in feet
  };

  const calculatePlants = () => {
    if (!horizontalDistance || !verticalDistance || !landArea) {
      alert("Please fill in all required fields");
      return;
    }

    // Convert distances to feet
    const hDistFeet = convertDistanceToFeet(parseFloat(horizontalDistance), distanceUnit);
    const vDistFeet = convertDistanceToFeet(parseFloat(verticalDistance), distanceUnit);
    
    // Calculate spacing area per plant
    const spacingArea = hDistFeet * vDistFeet;
    
    // Convert land area to square feet
    const totalAreaSqFt = convertToSquareFeet(parseFloat(landArea), landAreaUnit);
    
    // Calculate number of plants
    const numPlants = Math.floor(totalAreaSqFt / spacingArea);
    
    // Calculate total cost if provided
    let totalCost = null;
    if (costPerPlant) {
      totalCost = numPlants * parseFloat(costPerPlant);
    }

    setResults({
      numPlants,
      totalCost,
      totalAreaSqFt,
      spacingArea,
      plantName
    });
  };

  const resetForm = () => {
    setPlantName("Plants");
    setHorizontalDistance("");
    setVerticalDistance("");
    setDistanceUnit("feet");
    setLandArea("");
    setLandAreaUnit("acres");
    setCostPerPlant("");
    setResults(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-green-800 mb-4 flex items-center justify-center gap-2">
            <Calculator className="h-8 w-8" />
            Plant Calculator
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Calculate the number of plants required for your land area based on planting distances and estimate total costs.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Input Form */}
          <Card>
            <CardHeader>
              <CardTitle className="text-green-800 flex items-center gap-2">
                <Sprout className="h-5 w-5" />
                Planting Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Plant Name */}
              <div>
                <Label htmlFor="plantName">Plant Name (Optional)</Label>
                <Input
                  id="plantName"
                  value={plantName}
                  onChange={(e) => setPlantName(e.target.value || "Plants")}
                  placeholder="e.g., Tomato, Mango, Rose"
                />
              </div>

              {/* Planting Distances */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="horizontalDistance">Horizontal Distance *</Label>
                  <Input
                    id="horizontalDistance"
                    type="number"
                    value={horizontalDistance}
                    onChange={(e) => setHorizontalDistance(e.target.value)}
                    placeholder="e.g., 3"
                    min="0"
                    step="0.1"
                  />
                </div>
                <div>
                  <Label htmlFor="verticalDistance">Vertical Distance *</Label>
                  <Input
                    id="verticalDistance"
                    type="number"
                    value={verticalDistance}
                    onChange={(e) => setVerticalDistance(e.target.value)}
                    placeholder="e.g., 3"
                    min="0"
                    step="0.1"
                  />
                </div>
              </div>

              <div>
                <Label>Distance Unit</Label>
                <Select value={distanceUnit} onValueChange={setDistanceUnit}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="feet">Feet</SelectItem>
                    <SelectItem value="meters">Meters</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Land Area */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="landArea">Land Area *</Label>
                  <Input
                    id="landArea"
                    type="number"
                    value={landArea}
                    onChange={(e) => setLandArea(e.target.value)}
                    placeholder="e.g., 1"
                    min="0"
                    step="0.1"
                  />
                </div>
                <div>
                  <Label>Area Unit</Label>
                  <Select value={landAreaUnit} onValueChange={setLandAreaUnit}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="acres">Acres</SelectItem>
                      <SelectItem value="square feet">Square Feet</SelectItem>
                      <SelectItem value="square meters">Square Meters</SelectItem>
                      <SelectItem value="gunta">Gunta</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Cost Per Plant */}
              <div>
                <Label htmlFor="costPerPlant">Cost Per Plant (Optional)</Label>
                <Input
                  id="costPerPlant"
                  type="number"
                  value={costPerPlant}
                  onChange={(e) => setCostPerPlant(e.target.value)}
                  placeholder="e.g., 15"
                  min="0"
                  step="0.01"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <Button 
                  onClick={calculatePlants}
                  className="flex-1 bg-green-600 hover:bg-green-700"
                >
                  Calculate Plants
                </Button>
                <Button 
                  onClick={resetForm}
                  variant="outline"
                  className="flex-1"
                >
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Results */}
          <Card>
            <CardHeader>
              <CardTitle className="text-green-800">Calculation Results</CardTitle>
            </CardHeader>
            <CardContent>
              {results ? (
                <div className="space-y-6">
                  {/* Main Result */}
                  <div className="bg-green-50 p-6 rounded-lg text-center">
                    <div className="text-4xl font-bold text-green-800 mb-2">
                      {results.numPlants.toLocaleString()}
                    </div>
                    <div className="text-lg text-green-700">
                      {results.plantName} Required
                    </div>
                  </div>

                  {/* Cost Estimation */}
                  {results.totalCost && (
                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-yellow-800 mb-2">Cost Estimation</h3>
                      <div className="text-2xl font-bold text-yellow-700">
                        ₹{results.totalCost.toLocaleString()}
                      </div>
                      <div className="text-sm text-yellow-600 mt-1">
                        Total estimated cost
                      </div>
                    </div>
                  )}

                  {/* Calculation Details */}
                  <div className="space-y-3">
                    <h3 className="font-semibold text-gray-800">Calculation Details</h3>
                    <div className="text-sm text-gray-600 space-y-2">
                      <div className="flex justify-between">
                        <span>Total land area:</span>
                        <span>{results.totalAreaSqFt.toLocaleString()} sq ft</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Space per plant:</span>
                        <span>{results.spacingArea.toFixed(2)} sq ft</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Planting efficiency:</span>
                        <span>100% (grid layout)</span>
                      </div>
                    </div>
                  </div>

                  {/* Assumptions */}
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-medium text-blue-800 mb-2">Assumptions</h4>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• Regular grid planting pattern</li>
                      <li>• 100% usable land area</li>
                      <li>• No deductions for paths or borders</li>
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <Calculator className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Enter your planting details to see the calculation results</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PlantCalculator;
