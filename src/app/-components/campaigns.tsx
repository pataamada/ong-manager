import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Campaigns = () => {
  const campaigns = [
    {
      title: 'Adote um bichinho',
      description: 'Seja um padrinho pet!',
      image: '/images/campaign1.jpg',
      link: '#'
    },
    {
      title: 'Make a Difference',
      description: 'Ajude-nos a fazer a diferença',
      image: '/images/campaign2.jpg',
      link: '#'
    },
    {
      title: 'Castração',
      description: 'Campanha de castração',
      image: '/images/campaign3.jpg',
      link: '#'
    }
  ];

  return (
    <section className="py-16 px-4 md:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-heading-section mb-4">
          Campanhas
        </h2>
        <p className="text-subheading mb-12">
          Nos apoie em nossa missão!
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {campaigns.map((campaign, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="relative aspect-video">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="card-title mb-2">{campaign.title}</h3>
                    <p className="card-description text-sm text-zinc-400 mb-4">{campaign.description}</p>
                    <Button variant="secondary" className="w-full">
                      Saiba mais
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Campaigns;
