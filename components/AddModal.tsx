'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { toast } from "sonner";
import {uploadCollectionData} from "@/services/dbService";



const CollectionDialog = () => {

  const [formData, setFormData] = useState({
    fpuName: "",
    date: new Date().toLocaleDateString("en-GB", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    vehicleType: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await uploadCollectionData(formData, imageFile);
      toast.success("Uploaded successfully.");
      // Reset form or close dialog
    } catch (error) {
      toast.error("Upload failed", {
        description: error.message,
      });
    }
  };

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
        <Input type="number" placeholder="2000 kg" className="w-[95%] ml-2" onChange={(e) => handleChange("biomassDetails.weight", e.target.value + " kg")} />
      </div>
      <div className="space-y-2">
        <Label>Add Biomass Image</Label>
        <Input type="file" accept="image/jpeg,image/png,image/webp" onChange={handleFileChange} className="w-[95%] ml-2"/>
      </div>
    </div>

    <div className="flex justify-end pt-4">
      <Button type="submit" onClick={handleSubmit} className="w-full sm:w-auto">Submit</Button>
    </div>
  </DialogContent>
);
};

const ProductionDialog = () => {
  const [step, setStep] = useState(1);

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const biomassOptions = [
    "Empty Fruit Bunch (EFB)", "Lemon Myrtle", "Pine Needles", "Coconut Husks",
    "Rice Straw", "Bamboo Waste", "Corn Stalks", "Sugarcane Bagasse",
    "Wheat Straw", "Olive Pits"
  ];

  const statusOptions = ["In Progress", "Pending", "Completed", "Blocked", "Unassigned"];
  const assessmentOptions = ["Approved", "Rejected", "Unassessed"];

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
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select Biomass Name" />
              </SelectTrigger>
              <SelectContent>
                {biomassOptions.map((option) => (
                  <SelectItem key={option} value={option}>{option}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Date</Label>
            <Input type="text" placeholder="MM/DD/YYYY" />
          </div>
          <div className="space-y-2">
            <Label>Status</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((option) => (
                  <SelectItem key={option} value={option}>{option}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      {/* Step 2: Quantity & Time */}
      {step === 2 && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Start Time</Label>
            <Input type="text" placeholder="HH:MM AM/PM" />
          </div>
          <div className="space-y-2">
            <Label>Biomass Qty</Label>
            <Input type="number" placeholder="2000 kg" />
          </div>
          <div className="space-y-2">
            <Label>Biochar Qty</Label>
            <Input type="number" placeholder="370 Ltr" />
          </div>
        </div>
      )}

      {/* Step 3: Moisture Content */}
      {step === 3 && (
        <div className="space-y-4">
          <Label>Moisture %</Label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {[1, 2, 3, 4, 5].map((num) => (
              <Input key={num} type="number" placeholder={`Moisture ${num}`} className="w-full" />
            ))}
          </div>
        </div>
      )}

      {/* Step 4: File Uploads & Assessment */}
      {step === 4 && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="moistureContentImage">Moisture Content Image</Label>
              <Input type="file" accept="image/*" id="moistureContentImage" className="w-full" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="thermometerImages">Thermometer Images</Label>
              <Input type="file" accept="image/*" multiple id="thermometerImages" className="w-full" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="videos">Videos</Label>
              <Input type="file" accept="video/*" multiple id="videos" className="w-full" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="images">Additional Images</Label>
              <Input type="file" accept="image/*" multiple id="images" className="w-full" />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Assessment Status</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select Assessment Status" />
              </SelectTrigger>
              <SelectContent>
                {assessmentOptions.map((option) => (
                  <SelectItem key={option} value={option}>{option}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        {step > 1 ? <Button variant="outline" onClick={prevStep}>Back</Button> : <div />}
        {step < 4 ? <Button onClick={nextStep}>Next</Button> : <Button type="submit">Submit</Button>}
      </div>
    </DialogContent>
  );
};

const MixingDialog = () => {
  const biocharCategories = ["Pure", "Mix"];

  const [step, setStep] = useState(1);

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  return (
    <DialogContent className="max-w-md w-full p-6 sm:p-8 space-y-6 rounded-lg">
      <DialogHeader>
        <DialogTitle className="text-xl font-bold">Biochar Details</DialogTitle>
        <DialogDescription className="text-sm text-muted-foreground">
          Step {step} of 2
        </DialogDescription>
      </DialogHeader>

      {/* Step 1: Basic Info */}
      {step === 1 && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="biocharCategory">Biochar Category</Label>
            <Select>
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
            <Input type="text" placeholder="Compose" id="biocharType" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="volumeOfBiochar">Volume Of Biochar</Label>
            <Input type="number" placeholder="200 Ltr" id="volumeOfBiochar" />
          </div>
        </div>
      )}

      {/* Step 2: Final Details & Submit */}
      {step === 2 && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="availableUnpackedMix">Available Unpacked Mix</Label>
            <Input type="number" placeholder="20.00 kg" id="availableUnpackedMix" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="packagingDetails">Packaging Details</Label>
            <Input type="number" placeholder="8 Bags" id="packagingDetails" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="otherMixQty">Other Mix Qty</Label>
            <Input type="number" placeholder="200.00 kg" id="otherMixQty" />
          </div>
        </div>
      )}


      {/* Navigation Buttons */}
      <div className="flex justify-between">
        {step > 1 ? <Button variant="outline" onClick={prevStep}>Back</Button> : <div />}
        {step < 2 ? <Button onClick={nextStep}>Next</Button> : <Button type="submit">Submit</Button>}
      </div>
    </DialogContent>
  );
};


const DistributionDialog = () => {
  const [step, setStep] = useState(1);

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);


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
            <Select>
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
            <Select>
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
            <Select>
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
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {/* Distribution Type */}
          <div className="space-y-2">
            <Label htmlFor="distributionType">Distribution Type</Label>
            <Select>
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
            />
          </div>

          {/* Distribution Image */}
          <div className="space-y-2">
            <Label htmlFor="distributionImage">Add Distribution Image</Label>
            <Input
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/webp"
              id="distributionImage"
            />
          </div>
        </div>
      )}

      {/* Buttons */}
      <div className="flex justify-between">
        {step > 1 ? <Button variant="outline" onClick={prevStep}>Back</Button> : <div />}
        {step < 2 ? <Button onClick={nextStep}>Next</Button> : <Button type="submit">Submit</Button>}
      </div>
    </DialogContent>
  );
};




export const AddModal = ({ type }: { type: string }) => {

  const getDialog = () => {
    if (type == "Collection") return <CollectionDialog />
    if (type == "Production") return <ProductionDialog />
    if (type == "Mixing") return <MixingDialog />
    if (type == "Distribution") return <DistributionDialog />
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
