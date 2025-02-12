'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";



const CollectionDialog = () => (
    <DialogContent className="sm:max-w-[720px]">
        <DialogHeader>
            <DialogTitle className="text-xl font-bold">Collection Details</DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">Enter the details of the Collection Operation</DialogDescription>
        </DialogHeader>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div className="space-y-2">
                <Label>FPU Name</Label>
                <Select>
                    <SelectTrigger>Select FPU Name</SelectTrigger>
                    <SelectContent>
                        <SelectItem value="felda">FELDA Sungai Tengi</SelectItem>
                        <SelectItem value="sample">Sample</SelectItem>
                        <SelectItem value="lemon">Lemon Myrtle</SelectItem>
                        <SelectItem value="sifu">Sifu Tani Farms</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="space-y-2">
                <Label>Vehicle Name</Label>
                <Select>
                    <SelectTrigger>Select Vehicle</SelectTrigger>
                    <SelectContent>
                        <SelectItem value="nissan">Nissan Frontier</SelectItem>
                        <SelectItem value="ford">Ford Ranger</SelectItem>
                        <SelectItem value="toyota">Toyota Hilux</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="space-y-2">
                <Label>Biomass Type</Label>
                <Select>
                    <SelectTrigger>Select Biomass Type</SelectTrigger>
                    <SelectContent>
                        <SelectItem value="rice">Rice Stalk</SelectItem>
                        <SelectItem value="bush">Encroacher Bush</SelectItem>
                        <SelectItem value="cotton">Cotton Stalk</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="space-y-2">
                <Label>Biomass Qty</Label>
                <Input type="number" placeholder="2000 kg" />
            </div>
            <div className="space-y-2">
                <Label>Add Biomass Image</Label>
                <Input type="file" accept="image/jpeg,image/png,image/webp" />
            </div>
        </div>
        <div className="flex justify-end pt-4">
            <Button type="submit">Submit</Button>
        </div>
    </DialogContent>
);

const ProductionDialog = () => {
    const biomassOptions = [
        "Empty Fruit Bunch (EFB)",
        "Lemon Myrtle",
        "Pine Needles",
        "Coconut Husks",
        "Rice Straw",
        "Bamboo Waste",
        "Corn Stalks",
        "Sugarcane Bagasse",
        "Wheat Straw",
        "Olive Pits"
      ];

      const statusOptions = [
        "In Progress",
        "Pending",
        "Completed",
        "Blocked",
        "Unassigned"
      ];

      const assessmentOptions = [
        "Approved",
        "Rejected",
        "Unassessed"
      ];


  return (
    <DialogContent className="max-w-2xl">
    <DialogHeader>
      <DialogTitle className="text-xl font-bold">Production Details</DialogTitle>
      <DialogDescription className="text-sm text-muted-foreground">Enter the details of the Production Operation</DialogDescription>
    </DialogHeader>

    <form className="space-y-4">
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {/* Biomass Name */}
        <div className="space-y-2">
          <Label htmlFor="biomassName">Biomass Name</Label>
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

        {/* Date */}
        <div className="space-y-2">
          <Label htmlFor="date">Date</Label>
          <Input type="text" placeholder="MM/DD/YYYY" id="date" />
        </div>

        {/* Status */}
        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
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

        {/* Start Time */}
        <div className="space-y-2">
          <Label htmlFor="startTime">Start Time</Label>
          <Input type="text" placeholder="HH:MM AM/PM" id="startTime" />
        </div>

        {/* Biomass Qty */}
        <div className="space-y-2">
          <Label htmlFor="biomassQty">Biomass Qty</Label>
          <Input type="number" placeholder="2000 kg" id="biomassQty" />
        </div>

        {/* Biochar Qty */}
        <div className="space-y-2">
          <Label htmlFor="biocharQty">Biochar Qty</Label>
          <Input type="number" placeholder="370 Ltr" id="biocharQty" />
        </div>
      </div>

      {/* Moisture Content */}
      <div className="space-y-2">
        <Label>Moisture %</Label>
        <div className="grid sm:grid-cols-3 md:grid-cols-5 gap-2">
          {[1, 2, 3, 4, 5].map((num) => (
            <Input
              key={num}
              type="number"
              placeholder={`Moisture ${num}`}
              className="w-full"
            />
          ))}
        </div>
      </div>

      {/* File Uploads */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="moistureContentImage">Moisture Content Image</Label>
          <Input
            type="file"
            accept="image/jpeg,image/jpg,image/png,image/webp"
            id="moistureContentImage"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="thermometerImages">Thermometer Images</Label>
          <Input
            type="file"
            accept="image/jpeg,image/jpg,image/png,image/webp"
            multiple
            id="thermometerImages"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="videos">Videos</Label>
          <Input
            type="file"
            accept="video/mp4,video/quicktime,video/x-msvideo,video/x-matroska,video/webm,video/ogg"
            multiple
            id="videos"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="images">Images</Label>
          <Input
            type="file"
            accept="image/jpeg,image/jpg,image/png,image/webp"
            multiple
            id="images"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="assessmentStatus">Assessment Status</Label>
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

      <div className="flex justify-end space-x-2">
        <DialogTrigger asChild>
          <Button variant="outline">Cancel</Button>
        </DialogTrigger>
        <Button type="submit">Submit</Button>
      </div>
    </form>
  </DialogContent>
)};

const MixingDialog = () => {
    const biocharCategories = ["Pure", "Mix"];

    return (
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Biochar Details</DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">Enter the details of Biochar</DialogDescription>
          </DialogHeader>

          <form className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {/* Biochar Category */}
            <div className="space-y-2">
              <Label htmlFor="biocharCategory">Biochar Category</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select Biochar Category" />
                </SelectTrigger>
                <SelectContent>
                  {biocharCategories.map((category) => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Biochar Type */}
            <div className="space-y-2">
              <Label htmlFor="biocharType">Biochar Type</Label>
              <Input
                type="text"
                placeholder="Compose"
                id="biocharType"
                name="biocharType"
              />
            </div>

            {/* Volume of Biochar */}
            <div className="space-y-2">
              <Label htmlFor="volumeOfBiochar">Volume Of Biochar</Label>
              <Input
                type="number"
                placeholder="200 Ltr"
                id="volumeOfBiochar"
                name="volumeOfBiochar"
              />
            </div>

            {/* Open Biochar */}
            <div className="space-y-2">
              <Label htmlFor="openBiochar">Open Biochar</Label>
              <Input
                type="number"
                placeholder="200 Ltr"
                id="openBiochar"
                name="openBiochar"
              />
            </div>

            {/* Total Unpacked Mix */}
            <div className="space-y-2">
              <Label htmlFor="totalUnpackedMix">Total Unpacked Mix</Label>
              <Input
                type="number"
                placeholder="20.00 kg"
                id="totalUnpackedMix"
                name="totalUnpackedMix"
              />
            </div>

            {/* Available Unpacked Mix */}
            <div className="space-y-2">
              <Label htmlFor="availableUnpackedMix">Available Unpacked Mix</Label>
              <Input
                type="number"
                placeholder="20.00 kg"
                id="availableUnpackedMix"
                name="availableUnpackedMix"
              />
            </div>

            {/* Packaging Details */}
            <div className="space-y-2">
              <Label htmlFor="packagingDetails">Packaging Details</Label>
              <Input
                type="number"
                placeholder="8 Bags"
                id="packagingDetails"
                name="packagingDetails"
              />
            </div>

            {/* Other Mix Qty */}
            <div className="space-y-2">
              <Label htmlFor="otherMixQty">Other Mix Qty</Label>
              <Input
                type="number"
                placeholder="200.00 kg"
                id="otherMixQty"
                name="otherMixQty"
              />
            </div>

            <div className="col-span-full flex justify-end space-x-2">
              <DialogTrigger asChild>
                <Button variant="outline">Cancel</Button>
              </DialogTrigger>
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </DialogContent>
)};

const DistributionDialog = () => {
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
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold">Distribution Details</DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground">Enter the details of Distribution Operation</DialogDescription>
            </DialogHeader>

            <form className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
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

              <div className="col-span-full flex justify-end space-x-2">
                <DialogTrigger asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogTrigger>
                <Button type="submit">Submit</Button>
              </div>
            </form>
          </DialogContent>
)};


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
                <Button>Add {type}</Button>
            </DialogTrigger>
            {getDialog()}
        </Dialog>
    );
}
