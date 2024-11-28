import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "'@/components/ui/card'";
import { Building2, Phone, Mail, CheckCircle } from "lucide-react";

export function HospitalInfo() {
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold flex items-center">
          <Building2 className="mr-2" />
          Associated Hospital
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold">City Hospital</h3>
            <p className="text-sm text-gray-600">
              123 Main St, Cityville, State 12345
            </p>
          </div>
          <div className="flex items-center">
            <Phone className="mr-2" />
            <p>(123) 456-7890</p>
          </div>
          <div className="flex items-center">
            <Mail className="mr-2" />
            <p>contact@cityhospital.com</p>
          </div>
          <div className="flex items-center text-green-600">
            <CheckCircle className="mr-2" />
            <p>Connected</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
