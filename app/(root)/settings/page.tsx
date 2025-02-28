"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { auth, db } from "@/firebase";
import {
  reauthenticateWithCredential,
  EmailAuthProvider,
  updatePassword,
  deleteUser,
  onAuthStateChanged
} from "firebase/auth";
import { doc, deleteDoc } from "firebase/firestore";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";

export default function SettingsPage() {

  const router = useRouter();

  useEffect(() => {
    const redirect = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/sign-in");
      }
    });
    return () => redirect();
  }, [router]);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState("");

  const handlePasswordChange = async () => {
    setLoading(true);
    try {
      const user = auth.currentUser;
      if (!user || !user.email) return;

      const credential = EmailAuthProvider.credential(user.email, currentPassword);
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, newPassword);

      toast.success("Password Updated",{
        description: "Your password has been changed successfully",
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Error",{
        description: "Failed to update password",
      });
    }
    setLoading(false);
  };

  const handleAccountDelete = async () => {
    if (deleteConfirmation !== "DELETE MY ACCOUNT") return;

    setLoading(true);
    try {
      const user = auth.currentUser;
      if (!user) return;

      // Delete Firestore data
      await deleteDoc(doc(db, "users", user.uid));
      // Delete Auth user
      await deleteUser(user);

      toast.success("Account Deleted",{
        description: "Your account has been deleted successfully",
      });

      router.refresh();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Error",{
        description: "Failed to delete account",
      });
    }
    setLoading(false);
  };

  return (
      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Change Password</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Current Password</Label>
              <Input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </div>
            <div>
              <Label>New Password</Label>
              <Input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <Button
                onClick={handlePasswordChange}
                disabled={loading || !currentPassword || !newPassword}
            >
              Change Password
            </Button>
          </CardContent>
        </Card>

        <Card className="border-destructive">
          <CardHeader>
            <CardTitle className="text-destructive">Danger Zone</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>
                Type &#34;DELETE MY ACCOUNT&#34; to confirm
              </Label>
              <Input
                  value={deleteConfirmation}
                  onChange={(e) => setDeleteConfirmation(e.target.value)}
                  placeholder="DELETE MY ACCOUNT"
              />
            </div>
            <Button
                variant="destructive"
                onClick={handleAccountDelete}
                disabled={loading || deleteConfirmation !== "DELETE MY ACCOUNT"}
            >
              Delete Account Permanently
            </Button>
          </CardContent>
        </Card>
      </div>
  );
}