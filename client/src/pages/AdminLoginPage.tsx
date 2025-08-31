import { LoginForm } from "@/components/auth/LoginForm";
import { Page } from "@/components/layout/Page";
import { Card, CardContent } from "@/components/ui/card";

export function AdminLoginPage() {
  return (
    <Page center>
      <Card className="max-w-xs mx-auto w-full">
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </Page>
  );
}
