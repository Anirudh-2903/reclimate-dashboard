'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import {useCallback, useState} from "react";
import { toast } from "sonner";
import {
  uploadCollectionData,
  uploadDistributionData,
  uploadMixingData,
  uploadProductionData
} from "@/services/dbService";
import {Loader2} from "lucide-react";

const Status = ['In Progress' , 'Completed' , 'Pending' , 'Blocked' , 'Unassigned'];
const Assessment = ['Approved' , 'Rejected' , 'Pending'];


const CollectionDialog = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    fpuName: "",
    date: "",
    vehicleType: "",
    biomassDetails: {
      source: "",
      weight: "",
    },
    createdAt: new Date().toISOString(),
  });
  const [imageFile, setImageFile] = useState<File | null>(null);

  // @ts-ignore
  const handleChange = useCallback((field, value) => {
    setFormData((prev) => {
      if (field.includes(".")) {
        const [parent, child] = field.split(".");

        return {
          ...prev,
          [parent]: {
            // @ts-ignore
            ...prev[parent],
            [child]: value,
          },
        };
      } else {
        return { ...prev, [field]: value };
      }
    });
  }, []);

  // @ts-ignore
  const handleFileChange = useCallback((e) => {
    setImageFile(e.target.files[0]);
  }, []);

  const validateForm = () => {
    if (!formData.fpuName || !formData.date || !formData.vehicleType || !formData.biomassDetails.source || !formData.biomassDetails.weight || !imageFile) {
      toast.error("Please fill all required fields.");
      return false;
    }
    return true;
  };

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const formattedDate = new Date(formData.date).toLocaleDateString("en-GB", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      // Prepare the final data with the formatted date
      const finalData = {
        ...formData,
        date: formattedDate,
      };

      // Upload the data (replace with your upload logic)
      // @ts-ignore
      await uploadCollectionData(finalData, imageFile);
      toast.success("Uploaded successfully.");
      // Reset form or close dialog
    } catch (error) {
      toast.error("Upload failed", {
        // @ts-ignore
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
}, [formData, imageFile]);


return (
  <DialogContent className="w-full max-w-sm sm:max-w-lg md:max-w-2xl p-4 sm:p-6 rounded-lg">
    <DialogHeader>
      <DialogTitle className="text-lg sm:text-xl font-bold">Collection Details</DialogTitle>
      <DialogDescription className="text-sm text-muted-foreground">Enter the details of the Collection Operation</DialogDescription>
    </DialogHeader>

    {/* Scrollable Form Container for Mobile */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-h-[80vh] overflow-y-auto">
      <div className="space-y-2">
        <Label>FPU Name</Label>
         <Select onValueChange={(value) => handleChange("fpuName", value)}>
          <SelectTrigger className="w-[95%] ml-2"><SelectValue placeholder="Select FPU Name"  /></SelectTrigger>
          <SelectContent>
            <SelectItem value="FELDA Sungai Tengi">FELDA Sungai Tengi</SelectItem>
            <SelectItem value="Sample">Sample</SelectItem>
            <SelectItem value="Lemon Myrtle">Lemon Myrtle</SelectItem>
            <SelectItem value="Sifu Tani Farms">Sifu Tani Farms</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label>Vehicle Name</Label>
        <Select onValueChange={(value) => handleChange("vehicleType", value)}>
          <SelectTrigger className="w-[95%] ml-2"><SelectValue placeholder="Select Vehicle" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="Nissan Frontier">Nissan Frontier</SelectItem>
            <SelectItem value="Ford Ranger">Ford Ranger</SelectItem>
            <SelectItem value="Toyota Hilux">Toyota Hilux</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label>Biomass Type</Label>
        <Select onValueChange={(value) => handleChange("biomassDetails.source", value)} >
          <SelectTrigger className="w-[95%] ml-2"><SelectValue placeholder="Select Biomass Type" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="Rice Stalk">Rice Stalk</SelectItem>
            <SelectItem value="Encroacher Bush">Encroacher Bush</SelectItem>
            <SelectItem value="Cotton Stalk">Cotton Stalk</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label>Biomass Qty</Label>
        <Input type="number" placeholder="2000 kg"  className="w-[95%] ml-2" onChange={(e) => handleChange("biomassDetails.weight", e.target.value + " kg")} />
      </div>
      <div className="space-y-2">
        <Label>Add Biomass Image</Label>
        <Input type="file" accept="image/jpeg,image/png,image/webp" onChange={handleFileChange} className="w-[95%] ml-2"/>
      </div>
      <div className="space-y-2">
        <Label>Date</Label>
        <Input type="date" placeholder="DD/MM/YYYY" onChange={(e) => handleChange("date", e.target.value)} />
      </div>
    </div>

    <div className="flex justify-end pt-4">
      <Button type="submit" onClick={handleSubmit} disabled={isLoading}>
        {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Uploading...
            </>
        ) : (
            "Submit"
        )}
      </Button>
    </div>
  </DialogContent>
);
};

const ProductionDialog = () => {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // Form data state using a single object
  const [formData, setFormData] = useState({
    biomassName: "",
    date: "",
    status: "",
    assessment: "",
    startTime: { hour: "12", minute: "00", ampm: "AM" },
    biomassQty: "",
    biocharQty: "",
    moistureContent: Array(5).fill(""),
  });

  // File states
  const [moistureImage, setMoistureImage] = useState<File | null>(null);
  const [thermometerImages, setThermometerImages] = useState<File[]>([]);
  const [videos, setVideos] = useState<File[]>([]);
  const [additionalImages, setAdditionalImages] = useState<File[]>([]);

  // Generic field change handler
  const handleChange = useCallback((field: string, value: any) => {
    setFormData((prev) => {
      if (field.includes(".")) {
        const [parent, child] = field.split(".");
        return {
          ...prev,
          [parent]: {
            // @ts-ignore
            ...prev[parent],
            [child]: value,
          },
        };
      } else {
        return { ...prev, [field]: value };
      }
    });
  }, []);

  // Special handler for time fields
  const handleTimeChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      startTime: { ...prev.startTime, [field]: value },
    }));
  };

  // Handle moisture content changes
  const handleMoistureChange = (index: number, value: string) => {
    setFormData((prev) => {
      const newMoistureContent = [...prev.moistureContent];
      newMoistureContent[index] = value;
      return { ...prev, moistureContent: newMoistureContent };
    });
  };

  // File change handlers
  const handleMoistureImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMoistureImage(e.target.files?.[0] || null);
  };

  const handleThermometerImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setThermometerImages(Array.from(e.target.files || []));
  };

  const handleVideosChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVideos(Array.from(e.target.files || []));
  };

  const handleAdditionalImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAdditionalImages(Array.from(e.target.files || []));
  };

  // Form validation
  const validateForm = () => {
    const { biomassName, date, status, biomassQty, biocharQty } = formData;

    if (!biomassName || !date || !status || !biomassQty || !biocharQty || !thermometerImages || !additionalImages || !moistureImage || !videos) {
      toast.error( "Error",{
        description: "Please fill all required fields.",
      });
      return false;
    }

    if (!moistureImage) {
      toast.error("Error",{
        description: "Please upload a moisture content image.",
      });
      return false;
    }

    return true;
  };

  // Submit handler
  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // Format the time string
      const timeString = `${formData.startTime.hour}:${formData.startTime.minute} ${formData.startTime.ampm}`;

      // Convert moisture content array to record
      const moistureContentRecord = formData.moistureContent.reduce((acc, value, index) => {
        acc[`moisture${index + 1}`] = value;
        return acc;
      }, {} as Record<string, string>);

      // Format the date if needed
      const formattedDate = new Date(formData.date).toLocaleDateString("en-GB", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      // Prepare production data object
      const productionData = {
        biomassName: formData.biomassName,
        date: formattedDate,
        status: formData.status,
        assessment: formData.assessment,
        startTime: timeString,
        biomassQty: formData.biomassQty + " kg",
        biocharQty: formData.biocharQty + " Ltr",
        moistureContent: moistureContentRecord,
        moistureImage: '', // Will be set by uploadProductionData
        thermometerImages: [], // Will be set by uploadProductionData
        videos: [], // Will be set by uploadProductionData
        additionalImages: [], // Will be set by uploadProductionData
        mediaStatus: {
          temperature: thermometerImages.length,
          addImages: additionalImages.length,
          videos: videos.length,
        },
        createdAt: new Date().toISOString(),
      };

      // Call the upload function with data and files
      await uploadProductionData(
          productionData,
          {
            moistureImage: moistureImage!,
            thermometerImages,
            videos,
            additionalImages,
          }
      );

      // Show success message
      toast.success( "Success",{
        description: "Uploaded successfully.",
      });

      // Reset form or close dialog
      // resetForm();

    } catch (error: any) {
      // Show error message
      toast.error( "Error",{
        description: error.message || "Uploaded failed.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
      <DialogContent className="max-w-md p-6 space-y-6 rounded-lg shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-center">Production Details</DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground text-center">
            Step {step} of 4
          </DialogDescription>
        </DialogHeader>

        {/* Step 1: Basic Details */}
        {step === 1 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Biomass Name</Label>
                <Select
                    onValueChange={(value) => handleChange("biomassName", value)}
                    value={formData.biomassName}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Biomass Name" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Empty Fruit Bunch (EFB)">Empty Fruit Bunch (EFB)</SelectItem>
                    <SelectItem value="Lemon Myrtle">Lemon Myrtle</SelectItem>
                    <SelectItem value="Pine Needles">Pine Needles</SelectItem>
                    <SelectItem value="Coconut Husks">Coconut Husks</SelectItem>
                    <SelectItem value="Rice Straw">Rice Straw</SelectItem>
                    <SelectItem value="Bamboo Waste">Bamboo Waste</SelectItem>
                    <SelectItem value="Corn Stalks">Corn Stalks</SelectItem>
                    <SelectItem value="Sugarcane Bagasse">Sugarcane Bagasse</SelectItem>
                    <SelectItem value="Wheat Straw">Wheat Straw</SelectItem>
                    <SelectItem value="Olive Pits">Olive Pits</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 w-5/12">
                <Label>Date</Label>
                <Input
                    type="date"
                    placeholder="DD/MM/YYYY"
                    value={formData.date}
                    onChange={(e) => handleChange("date", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Status</Label>
                <Select
                    onValueChange={(value) => handleChange("status", value)}
                    value={formData.status}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>
                  <SelectContent>
                    {Status.map((option) => (
                        <SelectItem key={option} value={option}>{option}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
        )}

        {/* Step 3: Quantity & Time */}
        {step === 3 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Start Time</Label>
                <div className="flex gap-2">
                  {/* Hour Select */}
                  <Select
                      value={formData.startTime.hour}
                      onValueChange={(value) => handleTimeChange("hour", value)}
                  >
                    <SelectTrigger className="w-20">
                      <SelectValue placeholder="HH" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 12 }, (_, i) => (
                          <SelectItem key={i + 1} value={`${i + 1}`.padStart(2, "0")}>
                            {`${i + 1}`.padStart(2, "0")}
                          </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {/* Minute Select */}
                  <Select
                      value={formData.startTime.minute}
                      onValueChange={(value) => handleTimeChange("minute", value)}
                  >
                    <SelectTrigger className="w-20">
                      <SelectValue placeholder="MM" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 60 }, (_, i) => (
                          <SelectItem key={i} value={`${i}`.padStart(2, "0")}>
                            {`${i}`.padStart(2, "0")}
                          </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {/* AM/PM Select */}
                  <Select
                      value={formData.startTime.ampm}
                      onValueChange={(value) => handleTimeChange("ampm", value)}
                  >
                    <SelectTrigger className="w-20">
                      <SelectValue placeholder="AM/PM" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="AM">AM</SelectItem>
                      <SelectItem value="PM">PM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="moistureContentImage">Moisture Content Image</Label>
                  <Input
                      type="file"
                      accept="image/*"
                      id="moistureContentImage"
                      onChange={handleMoistureImageChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="thermometerImages">Thermometer Images</Label>
                  <Input
                      type="file"
                      accept="image/*"
                      multiple
                      id="thermometerImages"
                      onChange={handleThermometerImagesChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="videos">Videos</Label>
                  <Input
                      type="file"
                      accept="video/*"
                      multiple
                      id="videos"
                      onChange={handleVideosChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="images">Additional Images</Label>
                  <Input
                      type="file"
                      accept="image/*"
                      multiple
                      id="images"
                      onChange={handleAdditionalImagesChange}
                  />
                </div>
              </div>
            </div>
        )}

        {/* Step 2: Moisture Content */}
        {step === 2 && (
            <div className="space-y-4">
              <Label>Moisture %</Label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {formData.moistureContent.map((value, index) => (
                    <Input
                        key={index}
                        type="number"
                        placeholder={`Moisture ${index + 1}`}
                        value={value}
                        onChange={(e) => handleMoistureChange(index, e.target.value)}
                    />
                ))}
              </div>
            </div>
        )}

        {/* Step 4: File Uploads & Assessment */}
        {step === 4 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Biomass Qty</Label>
                <Input
                    type="number"
                    placeholder="2000 kg"
                    value={formData.biomassQty}
                    onChange={(e) => handleChange("biomassQty", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Biochar Qty</Label>
                <Input
                    type="number"
                    placeholder="370 Ltr"
                    value={formData.biocharQty}
                    onChange={(e) => handleChange("biocharQty", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Assessment Status</Label>
                <Select onValueChange={(value) => handleChange("assessment", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Assessment Status" />
                  </SelectTrigger>
                  <SelectContent>
                    {Assessment.map((option) => (
                        <SelectItem key={option} value={option}>{option}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          {step > 1 ? (
              <Button variant="outline" onClick={() => setStep(step - 1)} disabled={isLoading}>
                Back
              </Button>
          ) : <div />}

          {step < 4 ? (
              <Button onClick={() => setStep(step + 1)} disabled={isLoading}>
                Next
              </Button>
          ) : (
              <Button onClick={handleSubmit} disabled={isLoading}>
                {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Uploading...
                    </>
                ) : (
                    "Submit"
                )}
              </Button>
          )}
        </div>
      </DialogContent>
  );
};

const MixingDialog = () => {
  const biocharCategories = ["Pure", "Mix"];

  const [step, setStep] = useState(1);

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    date: "",
    category: "",
    type: "",
    volume: "",
    openBiochar: "",
    totalUnpackedMix: "",
    packagingDetails: "",
    availableUnpackedMix: "",
    otherMixQty: "",
    createdAt: new Date().toISOString(),
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  // @ts-ignore
  const handleChange = useCallback((field, value) => {
    setFormData((prev) => {
      if (field.includes(".")) {
        const [parent, child] = field.split(".");
        return {
          ...prev,
          [parent]: {
            // @ts-ignore
            ...prev[parent],
            [child]: value,
          },
        };
      } else {
        return { ...prev, [field]: value };
      }
    });
  }, []);
  // @ts-ignore
  const handleFileChange = useCallback((e) => {
    setImageFile(e.target.files[0]);
  }, []);

  const validateForm = () => {
    if (!formData.category || !formData.date || !formData.type || !formData.volume || !formData.packagingDetails || !formData.availableUnpackedMix || !formData.otherMixQty || !formData.openBiochar || !formData.totalUnpackedMix || !imageFile) {
      toast.error("Please fill all required fields.");
      return false;
    }
    return true;
  };

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const formattedDate = new Date(formData.date).toLocaleDateString("en-GB", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      // Prepare the final data with the formatted date
      const finalData = {
        ...formData,
        date: formattedDate,
      };

      // Upload the data (replace with your upload logic)
      // @ts-ignore
      await uploadMixingData(finalData, imageFile);
      toast.success("Uploaded successfully.");
      // Reset form or close dialog
    } catch (error) {
      toast.error("Upload failed", {
        // @ts-ignore
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  }, [formData, imageFile]);

  return (
    <DialogContent className="max-w-md w-full p-6 sm:p-8 space-y-6 rounded-lg">
      <DialogHeader>
        <DialogTitle className="text-xl font-bold">Biochar Details</DialogTitle>
        <DialogDescription className="text-sm text-muted-foreground">
          Step {step} of 3
        </DialogDescription>
      </DialogHeader>

      {/* Step 1: Basic Info */}
      {step === 1 && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="biocharCategory">Biochar Category</Label>
            <Select onValueChange={(value) => handleChange("category", value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Biochar Category" />
              </SelectTrigger>
              <SelectContent>
                {biocharCategories.map((category) => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="biocharType">Biochar Type</Label>
            <Input type="text" placeholder="Compose" id="biocharType" onChange={(e) => handleChange("type", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Date</Label>
            <Input type="date" placeholder="DD/MM/YYYY" onChange={(e) => handleChange("date", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="volumeOfBiochar">Volume Of Biochar</Label>
            <Input type="number" placeholder="200 Ltr" id="volumeOfBiochar" onChange={(e) => handleChange("volume", e.target.value + " Ltr")}/>
          </div>
        </div>
      )}

      {step === 2 && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="openBiochar">Open Biochar</Label>
              <Input type="number" placeholder="200 Ltr" id="openBiochar" onChange={(e) => handleChange("openBiochar", e.target.value + " Ltr")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="totalUnpackedMix">Total Unpacked Mix</Label>
              <Input type="number" placeholder="20.00 kg" id="totalUnpackedMix" onChange={(e) => handleChange("totalUnpackedMix", e.target.value + " kg")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="availableUnpackedMix">Available Unpacked Mix</Label>
              <Input type="number" placeholder="20.00 kg" id="availableUnpackedMix" onChange={(e) => handleChange("availableUnpackedMix", e.target.value + " kg")} />
            </div>
          </div>
      )}


      {step === 3 && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="packagingDetails">Packaging Details</Label>
            <Input
                type="number"
                placeholder="8 Bags"
                id="packagingDetails"
                onChange={(e) => {
                  const value = e.target.value;
                  const suffix = value === "1" ? "Bag" : "Bags";
                  handleChange("packagingDetails", `${value} ${suffix}`);
                }}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="otherMixQty">Other Mix Qty</Label>
            <Input type="number" placeholder="200.00 kg" id="otherMixQty" onChange={(e) => handleChange("otherMixQty", e.target.value + " kg")} />
          </div>
          <div className="space-y-2">
            <Label>Add BioChar Image</Label>
            <Input type="file" accept="image/jpeg,image/png,image/webp" onChange={handleFileChange} className="w-[95%] ml-2"/>
          </div>
        </div>
      )}


      {/* Navigation Buttons */}
      <div className="flex justify-between">
        {step > 1 ? <Button variant="outline" onClick={prevStep}>Back</Button> : <div />}
        {step < 3 ? <Button onClick={nextStep}>Next</Button> : <Button type="submit" disabled={isLoading} onClick={handleSubmit}>{isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Uploading...
            </>
        ) : (
            "Submit"
        )}</Button>}
      </div>
    </DialogContent>
  );
};

const DistributionDialog = () => {
  const [step, setStep] = useState(1);

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    date: "",
    farmerName: "",
    vehicle: "",
    buyerName: "",
    distributionType: "",
    distributionQty: "",
    createdAt: new Date().toISOString(),
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  // @ts-ignore
  const handleChange = useCallback((field, value) => {
    setFormData((prev) => {
      if (field.includes(".")) {
        const [parent, child] = field.split(".");
        return {
          ...prev,
          [parent]: {
            // @ts-ignore
            ...prev[parent],
            [child]: value,
          },
        };
      } else {
        return { ...prev, [field]: value };
      }
    });
  }, []);
  // @ts-ignore
  const handleFileChange = useCallback((e) => {
    setImageFile(e.target.files[0]);
  }, []);

  const validateForm = () => {
    if (!formData.farmerName || !formData.date || !formData.buyerName || !formData.distributionType || !formData.distributionQty || !imageFile) {
      toast.error("Please fill all required fields.");
      return false;
    }
    return true;
  };

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const formattedDate = new Date(formData.date).toLocaleDateString("en-GB", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      // Prepare the final data with the formatted date
      const finalData = {
        ...formData,
        date: formattedDate,
      };

      // Upload the data (replace with your upload logic)
      // @ts-ignore
      await uploadDistributionData(finalData, imageFile);
      toast.success("Uploaded successfully.");
      // Reset form or close dialog
    } catch (error) {
      toast.error("Upload failed", {
        // @ts-ignore
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  }, [formData, imageFile]);


  const farmerNames = [
    "Mohammed Hafiz", "Aisha Ibrahim", "Ahmed Zain", "Nurul Hidayah",
    "Yusuf Ali", "Fatimah Abdullah", "Hassan Omar", "Zainab Musa",
    "Aliyah Kamal", "Abdullah Rafiq"
  ];

  const vehicles = [
    "Nissan Frontier", "Toyota Hilux", "Ford Ranger", "Isuzu D-Max",
    "Chevrolet Colorado", "Mitsubishi Triton", "Mazda BT-50", "Ford F-150",
    "Toyota Land Cruiser", "Jeep Gladiator"
  ];

  const buyerNames = [
    "Jon Doh", "Sarah Lee", "Michael Brown", "Emily Clark",
    "David Smith", "Jessica Jones", "John Williams", "Robert Johnson",
    "Lisa Adams", "Christopher Evans"
  ];

  const distributionTypes = ["Pure", "Mix"];

  return (
    <DialogContent className="max-w-md w-full p-6 rounded-lg">
      <DialogHeader>
        <DialogTitle className="text-xl font-bold">Distribution Details</DialogTitle>
        <DialogDescription className="text-sm text-muted-foreground">
          Step {step} of 2
        </DialogDescription>
      </DialogHeader>

      {step === 1 ? (
        <div className="grid grid-cols-1 gap-4">
          {/* Farmer Name */}
          <div className="space-y-2">
            <Label htmlFor="farmerName">Farmer Name</Label>
            <Select onValueChange={(value) => handleChange("farmerName", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select Farmer Name" />
              </SelectTrigger>
              <SelectContent>
                {farmerNames.map((name) => (
                  <SelectItem key={name} value={name}>{name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Vehicle Name */}
          <div className="space-y-2">
            <Label htmlFor="vehicleName">Vehicle Name</Label>
            <Select onValueChange={(value) => handleChange("vehicle", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select Vehicle" />
              </SelectTrigger>
              <SelectContent>
                {vehicles.map((vehicle) => (
                  <SelectItem key={vehicle} value={vehicle}>{vehicle}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Buyer Name */}
          <div className="space-y-2">
            <Label htmlFor="buyerName">Buyer Name</Label>
            <Select onValueChange={(value) => handleChange("buyerName", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select Buyer Name" />
              </SelectTrigger>
              <SelectContent>
                {buyerNames.map((name) => (
                  <SelectItem key={name} value={name}>{name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Date</Label>
            <Input type="date" placeholder="DD/MM/YYYY" onChange={(e) => handleChange("date", e.target.value)} />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {/* Distribution Type */}
          <div className="space-y-2">
            <Label htmlFor="distributionType">Distribution Type</Label>
            <Select onValueChange={(value) => handleChange("distributionType", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select Distribution Type" />
              </SelectTrigger>
              <SelectContent>
                {distributionTypes.map((type) => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Distribution Quantity */}
          <div className="space-y-2">
            <Label htmlFor="distributionQty">Distribution Qty</Label>
            <Input
              type="number"
              placeholder="Enter quantity"
              id="distributionQty"
              name="distributionQty"
              onChange={(e) => handleChange("distributionQty", e.target.value + " kg")}
            />
          </div>

          {/* Distribution Image */}
          <div className="space-y-2">
            <Label htmlFor="distributionImage">Add Distribution Image</Label>
            <Input
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/webp"
              id="distributionImage"
              onChange={handleFileChange}
            />
          </div>
        </div>
      )}

      {/* Buttons */}
      <div className="flex justify-between">
        {step > 1 ? <Button variant="outline" onClick={prevStep}>Back</Button> : <div />}
        {step < 2 ? <Button onClick={nextStep}>Next</Button> :  <Button type="submit" disabled={isLoading} onClick={handleSubmit}>{isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Uploading...
            </>
        ) : (
            "Submit"
        )}</Button>}
      </div>
    </DialogContent>
  );
};


export const AddModal = ({ type }: { type: string }) => {

  const getDialog = () => {
    if (type == "Collection") return <CollectionDialog />
    if (type == "Production") return <ProductionDialog />
    if (type == "Mixing") return <MixingDialog />
    if (type == "Distribution") return <DistributionDialog  />
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full sm:w-auto">Add {type}</Button>
      </DialogTrigger>
      {getDialog()}
    </Dialog>
  );
}
