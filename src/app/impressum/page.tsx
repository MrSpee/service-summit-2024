import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export default function ImpressumPage() {
  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Impressum</CardTitle>
        </CardHeader>
        <CardContent>
          <h2 className="text-xl font-semibold mb-4">Angaben gemäß § 5 TMG</h2>
          <p>
            Deloitte GmbH Wirtschaftsprüfungsgesellschaft<br />
            Dammtorstraße 12<br />
            20354 Hamburg
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-4">Kontakt</h2>
          <p>
            Telefon: +49 (0)40 32080 0<br />
            E-Mail: info@deloitte.de
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-4">Registereintrag</h2>
          <p>
            Eintragung im Handelsregister.<br />
            Registergericht: Amtsgericht München<br />
            Registernummer: HRB 83442
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-4">Umsatzsteuer-ID</h2>
          <p>
            Umsatzsteuer-Identifikationsnummer gemäß §27 a Umsatzsteuergesetz:<br />
            DE 129 223 460
          </p>
          
          <h2 className="text-xl font-semibold mt-6 mb-4">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
          <p>
            Dr. Thomas Schlaak<br />
            Dammtorstraße 12<br />
            20354 Hamburg
          </p>
        </CardContent>
      </Card>
    </div>
  );
}