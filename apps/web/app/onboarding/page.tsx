"use client"

import * as React from "react"
import { useAuth, useClerk } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Shield } from "lucide-react"

export default function OnboardingPage() {
    const { orgId } = useAuth()
    const { openCreateOrganization } = useClerk()
    const router = useRouter()

    React.useEffect(() => {
        if (orgId) {
            router.push("/dashboard")
        }
    }, [orgId, router])

    return (
        <div className="flex min-h-screen items-center justify-center bg-muted/20">
            <Card className="w-[450px]">
                <CardHeader className="text-center">
                    <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                        <Shield className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle>Welcome to Bastion</CardTitle>
                    <CardDescription>To continue, please create or join an organization.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Button className="w-full h-12 text-base" onClick={() => openCreateOrganization()}>
                        Create New Organization
                    </Button>
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-muted-foreground">Or</span>
                        </div>
                    </div>
                    <p className="text-center text-sm text-muted-foreground">
                        Ask your team admin for an invite link to join an existing organization.
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}
