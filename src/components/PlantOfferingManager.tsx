
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Variety {
  casteName: string;
  cost: number;
  plantAge: string;
  qualityAssurance: string;
  availabilityDays: number;
  quantityAvailable: number;
}

interface PlantOffering {
  plantName: string;
  varieties: Variety[];
}

const PlantOfferingManager = () => {
  const { toast } = useToast();
  const [offerings, setOfferings] = useState<PlantOffering[]>([
    {
      plantName: "",
      varieties: [
        {
          casteName: "",
          cost: 0,
          plantAge: "",
          qualityAssurance: "",
          availabilityDays: 0,
          quantityAvailable: 0
        }
      ]
    }
  ]);

  const addNewPlant = () => {
    setOfferings([
      ...offerings,
      {
        plantName: "",
        varieties: [
          {
            casteName: "",
            cost: 0,
            plantAge: "",
            qualityAssurance: "",
            availabilityDays: 0,
            quantityAvailable: 0
          }
        ]
      }
    ]);
  };

  const removePlant = (plantIndex: number) => {
    setOfferings(offerings.filter((_, index) => index !== plantIndex));
  };

  const addVariety = (plantIndex: number) => {
    const updatedOfferings = [...offerings];
    updatedOfferings[plantIndex].varieties.push({
      casteName: "",
      cost: 0,
      plantAge: "",
      qualityAssurance: "",
      availabilityDays: 0,
      quantityAvailable: 0
    });
    setOfferings(updatedOfferings);
  };

  const removeVariety = (plantIndex: number, varietyIndex: number) => {
    const updatedOfferings = [...offerings];
    updatedOfferings[plantIndex].varieties = updatedOfferings[plantIndex].varieties.filter(
      (_, index) => index !== varietyIndex
    );
    setOfferings(updatedOfferings);
  };

  const updatePlantName = (plantIndex: number, plantName: string) => {
    const updatedOfferings = [...offerings];
    updatedOfferings[plantIndex].plantName = plantName;
    setOfferings(updatedOfferings);
  };

  const updateVariety = (plantIndex: number, varietyIndex: number, field: keyof Variety, value: string | number) => {
    const updatedOfferings = [...offerings];
    updatedOfferings[plantIndex].varieties[varietyIndex] = {
      ...updatedOfferings[plantIndex].varieties[varietyIndex],
      [field]: value
    };
    setOfferings(updatedOfferings);
  };

  const saveOfferings = () => {
    // Validate required fields
    const isValid = offerings.every(plant => 
      plant.plantName.trim() !== "" && 
      plant.varieties.every(variety => 
        variety.casteName.trim() !== "" && 
        variety.cost > 0
      )
    );

    if (!isValid) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields (Plant Name, Variety Name, and Cost).",
        variant: "destructive",
      });
      return;
    }

    // Here you would typically save to backend
    console.log("Saving offerings:", offerings);
    toast({
      title: "Success",
      description: "Your plant offerings have been saved successfully!",
    });
  };

  const plantAgeOptions = [
    "Seedling",
    "2 weeks",
    "1 month", 
    "2 months",
    "3 months",
    "6 months",
    "1 year",
    "2+ years"
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-green-800">Plant Offering Manager</h2>
          <p className="text-gray-600 mt-1">Manage your nursery inventory and pricing</p>
        </div>
        <Button onClick={saveOfferings} className="bg-green-600 hover:bg-green-700">
          <Save className="h-4 w-4 mr-2" />
          Save All Offerings
        </Button>
      </div>

      <div className="space-y-6">
        {offerings.map((plant, plantIndex) => (
          <Card key={plantIndex} className="border-l-4 border-l-green-500">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Plant #{plantIndex + 1}</CardTitle>
                {offerings.length > 1 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removePlant(plantIndex)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <Label htmlFor={`plant-name-${plantIndex}`}>
                    Plant Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id={`plant-name-${plantIndex}`}
                    placeholder="e.g., Tomato, Rose, Basil"
                    value={plant.plantName}
                    onChange={(e) => updatePlantName(plantIndex, e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-base font-medium">Varieties/Castes</Label>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => addVariety(plantIndex)}
                  className="text-green-600 hover:text-green-700"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Variety
                </Button>
              </div>

              {plant.varieties.map((variety, varietyIndex) => (
                <Card key={varietyIndex} className="bg-gray-50">
                  <CardContent className="pt-4">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-medium">Variety #{varietyIndex + 1}</h4>
                      {plant.varieties.length > 1 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeVariety(plantIndex, varietyIndex)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor={`variety-name-${plantIndex}-${varietyIndex}`}>
                          Variety Name <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id={`variety-name-${plantIndex}-${varietyIndex}`}
                          placeholder="e.g., Yamarold, Sweet Basil"
                          value={variety.casteName}
                          onChange={(e) => updateVariety(plantIndex, varietyIndex, 'casteName', e.target.value)}
                          className="mt-1"
                        />
                      </div>

                      <div>
                        <Label htmlFor={`cost-${plantIndex}-${varietyIndex}`}>
                          Cost per Plant (₹) <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id={`cost-${plantIndex}-${varietyIndex}`}
                          type="number"
                          placeholder="0"
                          value={variety.cost || ''}
                          onChange={(e) => updateVariety(plantIndex, varietyIndex, 'cost', parseFloat(e.target.value) || 0)}
                          className="mt-1"
                        />
                      </div>

                      <div>
                        <Label htmlFor={`age-${plantIndex}-${varietyIndex}`}>Plant Age</Label>
                        <Select
                          value={variety.plantAge}
                          onValueChange={(value) => updateVariety(plantIndex, varietyIndex, 'plantAge', value)}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select age" />
                          </SelectTrigger>
                          <SelectContent>
                            {plantAgeOptions.map((age) => (
                              <SelectItem key={age} value={age}>{age}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor={`availability-${plantIndex}-${varietyIndex}`}>Availability (Days)</Label>
                        <Input
                          id={`availability-${plantIndex}-${varietyIndex}`}
                          type="number"
                          placeholder="30"
                          value={variety.availabilityDays || ''}
                          onChange={(e) => updateVariety(plantIndex, varietyIndex, 'availabilityDays', parseInt(e.target.value) || 0)}
                          className="mt-1"
                        />
                      </div>

                      <div>
                        <Label htmlFor={`quantity-${plantIndex}-${varietyIndex}`}>Quantity Available</Label>
                        <Input
                          id={`quantity-${plantIndex}-${varietyIndex}`}
                          type="number"
                          placeholder="100"
                          value={variety.quantityAvailable || ''}
                          onChange={(e) => updateVariety(plantIndex, varietyIndex, 'quantityAvailable', parseInt(e.target.value) || 0)}
                          className="mt-1"
                        />
                      </div>

                      <div className="md:col-span-2 lg:col-span-3">
                        <Label htmlFor={`quality-${plantIndex}-${varietyIndex}`}>Quality Assurance</Label>
                        <Textarea
                          id={`quality-${plantIndex}-${varietyIndex}`}
                          placeholder="e.g., Organically grown, Disease resistant, etc."
                          value={variety.qualityAssurance}
                          onChange={(e) => updateVariety(plantIndex, varietyIndex, 'qualityAssurance', e.target.value)}
                          className="mt-1"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-center">
        <Button onClick={addNewPlant} variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
          <Plus className="h-4 w-4 mr-2" />
          Add New Plant
        </Button>
      </div>
    </div>
  );
};

export default PlantOfferingManager;
