import { Router } from "express";
import PageModel from "../database.js";

// const frontpageRouter = Router();

frontpageRouter.get("/", async (req, res) => {
  const test = await PageModel.find({});
  res.json(test);
});



// no touch!! - it posts/create 
frontpageRouter.get("/frontPost", async (req, res) => {
  const newPage = new PageModel({
    pageTitle: "Synergi Human Resource Management",
    pageBody: [
      {
        title: "",
        body: `Ejes og drives af chefkonsulent Peter Sass Hansen-Skovmoes. Beskæftiger sig især med proceskonsultation, coaching af enkeltpersoner eller team, teamudvikling, netværksfacilitering og interne skræddersyede forløb, f. eks. leder- og ledelsesudvikling, coaching- og proceskonsulentuddannelse. Løser opgaver for både offentlige og private organisationer. Indgår i netværk med og samarbejder med en række andre mindre konsulentfirmaer. Læs her om vores teoretiske ståsted og hvordan samarbejdet med kunden typisk gribes an. Du er meget velkommen til at tage kontakt for at høre mere om vores ydelser og arbejdsformer.`,
        placement: 1
      },
      {
        title: "Samtaler i organisationer – veje til mening, læring og værdi.",
        body: `Sammen med min gode kollega Gert Rosenkvist har jeg skrevet en praksisorienteret bog om professionelle samtaler.

Bogen er skrevet til ledere og andre professionelle, som fører samtaler med medarbejdere,borgere, brugere, kunder og samarbejdspartnere.

Bogen henvender sig også til undervisere og studerende på professionsuddannelser hvor samtaler er en væsentlig del af professionel praksis.

Du kan læse en anmeldelse af bogen her

Bogen, der nu er på gaden i 3. oplag, kan købes her.

Til Seminarer.dk har jeg skrevet denne artikel om professionelle samtaler.

Læs også min seneste artikel om samtaler i Offentlig ledelse 4/2018 her. Har også bidraget med en artikel om professionelle samtaler i tidsskriftet Erhvervspsykologi nr 4 2018.`,
        placement: 2
      },
      {
        title: "Dialogbaseret APV – hvad?, hvorfor? og hvordan?",
        body: `De traditionelle APV’er bygger typisk på anonyme, individuelle og elektroniske vurderinger. Denne type af undersøgelser og vurderinger fører ofte til varigt beskadige relationer, fremfor et bedre arbejdsmiljø.

Dialogbaseret APV. bygger på dialog om fælles udvalgte temaer med aktuel og konkret relevans for den pågældende organisation.

Vi har gode erfaringer med at hjælpe organisationer med at anvende dialogbaseret APV.

Erfaringer, der handler om både bedre resultater og bedre relationer.

Læs vores artikel hvor vi anbefaler at erstatte de traditionelle arbejdspladsvurderinger (APV’er) med en Dialogbaseret APV.

Kontakt os gerne hvis I kunne have glæde af et oplæg og/eller processtøtte til gennemførelse af dialogbaseret APV.`,
        placement: 3
      },
      {
        title: "Kom godt gennem forandringer sammen",
        body: `Læs vores artikel om ledelse af forandringer i et narrativt perspektiv på lederweb

Kontakt os gerne hvis I kunne have glæde af et oplæg og/eller processtøtte til at komme godt gennem organisatoriske forandringer sammen.`,
        placement: 4
      },
      {
        title: "Coaching i en organisatorisk kontekst – muligheder, udfordringer og dilemmaer",
        body: `Sammen med Gert Rosenkvist har jeg skrevet en artikel om muligheder, udfordringer og dilemmaer ved coaching i en organisatorisk kontekst.

Artiklen blev bragt i Erhvervspsykologi nr. 3, 2015. En kort omtale af artiklen kan læses her: Coachingartikel. Artiklen kan købes her`,
        placement: 5
      },
      {
        title: "Facilitatortræf i Danmark",
        body: `Facilitatortræf 2020 blev aflyst grundet covid 19-pandemien

Facilitatortræf 2019 blev afholdt fredag d. 23. august 2019 hos MS på Nørrebro.

Se billeder fra dagen her

Se videoreportagen fra træffet i 2018 her, 2017 her og for 2016 her Videoreportagerne fra 2014 0g 2015 kan du se eller gense her`,
        placement: 6
      }
    ]
  });

  newPage.save().then((savedPage) => {
    console.log("frontpage saved", savedPage);
  });
});

// no touch!! - test create
frontpageRouter.get("/post", async (req, res) => {
  const newPage = new PageModel({
    pageTitle: "En anden side igen",
    pageBody: [{ title: "Hej titel", body: "Dette er en anden side", image: "lol", placement: 30 }]
  });

  newPage.save().then((savedPage) => {
    console.log("page saved", savedPage);
  });
});

// no touch!! - test update
frontpageRouter.get("/patch", async (req, res) => {
  const newPage = {
    pageTitle: "Noget nyt"
  };

  PageModel.updateOne({ pageTitle: "Forside" }, newPage).then((savedPage) => {
    console.log("page saved", savedPage);
  });
});

// export default frontpageRouter;
