
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2, Save, Upload, X, Image, Video } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface MediaFile {
  file: File;
  preview: string;
  type: 'image' | 'video';
}

interface Variety {
  casteName: string;
  cost: number;
  plantAge: string;
  qualityAssurance: string;
  availabilityDays: number;
  quantityAvailable: number;
  qualityPhotos: MediaFile[];
  qualityVideos: MediaFile[];
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
          quantityAvailable: 0,
          qualityPhotos: [],
          qualityVideos: []
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
            quantityAvailable: 0,
            qualityPhotos: [],
            qualityVideos: []
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
      quantityAvailable: 0,
      qualityPhotos: [],
      qualityVideos: []
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

  const updateVariety = (plantIndex: number, varietyIndex: number, field: keyof Variety, value: string | number | MediaFile[]) => {
    const updatedOfferings = [...offerings];
    updatedOfferings[plantIndex].varieties[varietyIndex] = {
      ...updatedOfferings[plantIndex].varieties[varietyIndex],
      [field]: value
    };
    setOfferings(updatedOfferings);
  };

  const handleMediaUpload = (plantIndex: number, varietyIndex: number, files: FileList | null, mediaType: 'photos' | 'videos') => {
    if (!files) return;

    const newFiles: MediaFile[] = [];
    const maxSizePhoto = 100 * 1024; // 100KB for photos
    const maxSizeVideo = 10 * 1024 * 1024; // 10MB for videos

    Array.from(files).forEach(file => {
      // Validate file type
      const isImage = file.type.startsWith('image/');
      const isVideo = file.type.startsWith('video/');
      
      if (mediaType === 'photos' && !isImage) {
        toast({
          title: "Invalid File Type",
          description: "Please upload image files only (.jpg, .jpeg, .png)",
          variant: "destructive",
        });
        return;
      }

      if (mediaType === 'videos' && !isVideo) {
        toast({
          title: "Invalid File Type",
          description: "Please upload video files only (.mp4, .mov, .webm)",
          variant: "destructive",
        });
        return;
      }

      // Validate file size
      const maxSize = mediaType === 'photos' ? maxSizePhoto : maxSizeVideo;
      if (file.size > maxSize) {
        toast({
          title: "File Too Large",
          description: `${mediaType === 'photos' ? 'Photos' : 'Videos'} must be under ${mediaType === 'photos' ? '100KB' : '10MB'}`,
          variant: "destructive",
        });
        return;
      }

      // For videos, we'd need to check duration on the client side
      if (isVideo) {
        const video = document.createElement('video');
        video.preload = 'metadata';
        video.onloadedmetadata = () => {
          if (video.duration > 60) {
            toast({
              title: "Video Too Long",
              description: "Videos must be 60 seconds or shorter",
              variant: "destructive",
            });
            return;
          }
        };
        video.src = URL.createObjectURL(file);
      }

      const preview = URL.createObjectURL(file);
      newFiles.push({
        file,
        preview,
        type: isImage ? 'image' : 'video'
      });
    });

    if (newFiles.length > 0) {
      const currentVariety = offerings[plantIndex].varieties[varietyIndex];
      const fieldName = mediaType === 'photos' ? 'qualityPhotos' : 'qualityVideos';
      const currentMedia = currentVariety[fieldName] as MediaFile[];
      updateVariety(plantIndex, varietyIndex, fieldName, [...currentMedia, ...newFiles]);
    }
  };

  const removeMedia = (plantIndex: number, varietyIndex: number, mediaIndex: number, mediaType: 'photos' | 'videos') => {
    const currentVariety = offerings[plantIndex].varieties[varietyIndex];
    const fieldName = mediaType === 'photos' ? 'qualityPhotos' : 'qualityVideos';
    const currentMedia = currentVariety[fieldName] as MediaFile[];
    
    // Revoke the object URL to prevent memory leaks
    URL.revokeObjectURL(currentMedia[mediaIndex].preview);
    
    const updatedMedia = currentMedia.filter((_, index) => index !== mediaIndex);
    updateVariety(plantIndex, varietyIndex, fieldName, updatedMedia);
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

                      {/* Media Upload Section */}
                      <div className="md:col-span-2 lg:col-span-3 space-y-4 border-t pt-4">
                        <h5 className="font-medium text-green-700">Quality Assurance Media</h5>
                        
                        {/* Photo Upload */}
                        <div>
                          <Label>Upload Quality Assurance Photos</Label>
                          <p className="text-xs text-gray-500 mb-2">Max 100KB per photo. Formats: .jpg, .jpeg, .png</p>
                          <div className="flex items-center gap-2">
                            <Input
                              type="file"
                              accept="image/*"
                              multiple
                              onChange={(e) => handleMediaUpload(plantIndex, varietyIndex, e.target.files, 'photos')}
                              className="hidden"
                              id={`photo-upload-${plantIndex}-${varietyIndex}`}
                            />
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => document.getElementById(`photo-upload-${plantIndex}-${varietyIndex}`)?.click()}
                            >
                              <Upload className="h-4 w-4 mr-2" />
                              Upload Photos
                            </Button>
                          </div>
                          
                          {/* Photo Previews */}
                          {variety.qualityPhotos.length > 0 && (
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                              {variety.qualityPhotos.map((photo, photoIndex) => (
                                <div key={photoIndex} className="relative group">
                                  <img
                                    src={photo.preview}
                                    alt={`Quality photo ${photoIndex + 1}`}
                                    className="w-full h-20 object-cover rounded border"
                                  />
                                  <Button
                                    size="sm"
                                    variant="destructive"
                                    className="absolute top-1 right-1 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                                    onClick={() => removeMedia(plantIndex, varietyIndex, photoIndex, 'photos')}
                                  >
                                    <X className="h-3 w-3" />
                                  </Button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Video Upload */}
                        <div>
                          <Label>Upload Quality Assurance Videos</Label>
                          <p className="text-xs text-gray-500 mb-2">Max 60 seconds, 10MB per video. Formats: .mp4, .mov, .webm</p>
                          <div className="flex items-center gap-2">
                            <Input
                              type="file"
                              accept="video/*"
                              multiple
                              onChange={(e) => handleMediaUpload(plantIndex, varietyIndex, e.target.files, 'videos')}
                              className="hidden"
                              id={`video-upload-${plantIndex}-${varietyIndex}`}
                            />
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => document.getElementById(`video-upload-${plantIndex}-${varietyIndex}`)?.click()}
                            >
                              <Video className="h-4 w-4 mr-2" />
                              Upload Videos
                            </Button>
                          </div>
                          
                          {/* Video Previews */}
                          {variety.qualityVideos.length > 0 && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                              {variety.qualityVideos.map((video, videoIndex) => (
                                <div key={videoIndex} className="relative group">
                                  <video
                                    src={video.preview}
                                    className="w-full h-32 object-cover rounded border"
                                    controls
                                    preload="metadata"
                                  />
                                  <Button
                                    size="sm"
                                    variant="destructive"
                                    className="absolute top-1 right-1 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                                    onClick={() => removeMedia(plantIndex, varietyIndex, videoIndex, 'videos')}
                                  >
                                    <X className="h-3 w-3" />
                                  </Button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
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
