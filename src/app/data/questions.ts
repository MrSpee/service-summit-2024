const questions = [
    {
      questionText: "Wie viele Tage dauert die Weihnachtszeit laut christlichem Kalender?",
      answerOptions: [
        { answerText: "7 Tage", isCorrect: false },
        { answerText: "12 Tage", isCorrect: true },
        { answerText: "25 Tage", isCorrect: false },
        { answerText: "40 Tage", isCorrect: false },
      ],
      explanation: "Die Weihnachtszeit beginnt mit dem ersten Weihnachtsfeiertag (25. Dezember) und endet am 6. Januar (Dreikönigstag), weshalb man von den 'Zwölf Weihnachtstagen' spricht."
    },
    {
      questionText: "Welche Farbe hat der Bischofsstab des Nikolaus traditionell in Deutschland?",
      answerOptions: [
        { answerText: "Gold", isCorrect: true },
        { answerText: "Silber", isCorrect: false },
        { answerText: "Rot", isCorrect: false },
        { answerText: "Braun", isCorrect: false },
      ],
      explanation: "Der Bischofsstab ist traditionell goldfarben und symbolisiert die kirchliche Autorität des heiligen Nikolaus."
    },
    {
      questionText: "Wie viele Weihnachtsbäume werden in Deutschland jährlich verkauft?",
      answerOptions: [
        { answerText: "Über 10 Millionen", isCorrect: false },
        { answerText: "Über 15 Millionen", isCorrect: false },
        { answerText: "Über 25 Millionen", isCorrect: true },
        { answerText: "Über 30 Millionen", isCorrect: false },
      ],
      explanation: "Laut dem Bundesverband der Weihnachtsbaum- und Schmuckgrünerzeuger werden in Deutschland jährlich über 25 Millionen Weihnachtsbäume verkauft."
    },
    {
      questionText: "Was haben Deloitte-Beraterinnen und der Weihnachtsmann gemeinsam?",
      answerOptions: [
        { answerText: "Beide kommen ohne ihre Helfer:innen nicht weit.", isCorrect: false },
        { answerText: "Beide haben eine Leidenschaft für effiziente Lieferketten.", isCorrect: true },
        { answerText: "Beide bringen Licht ins Dunkel – ob mit Strategien oder Rentieren.", isCorrect: false },
        { answerText: "Beide lieben es, Präsentationen unter den Baum zu legen.", isCorrect: false },
      ],
      explanation: "Wie der Weihnachtsmann achten Deloitte-Beraterinnen auf reibungslose Prozesse – ob bei Geschenklieferungen oder Transformationsprojekten."
    },
    {
      questionText: "Wie viele Mitarbeitende hat Deloitte Deutschland (Stand 2024)?",
      answerOptions: [
        { answerText: "Über 5.000", isCorrect: false },
        { answerText: "Über 8.000", isCorrect: false },
        { answerText: "Über 10.000", isCorrect: false },
        { answerText: "Über 13.000", isCorrect: true },
      ],
      explanation: "Deloitte Deutschland beschäftigt über 13.000 Mitarbeitende. Laut dem Geschäftsbericht 23/24 waren es genau 13.789 Mitarbeiter."
    },
    {
      questionText: "In welchem Land wurde der Brauch des Weihnachtsbaums erfunden?",
      answerOptions: [
        { answerText: "Deutschland", isCorrect: true },
        { answerText: "Schweden", isCorrect: false },
        { answerText: "Österreich", isCorrect: false },
        { answerText: "Schweiz", isCorrect: false },
      ],
      explanation: "Der Weihnachtsbaum-Brauch stammt aus Deutschland und verbreitete sich von dort im 16. Jahrhundert weltweit."
    },
    {
      questionText: "Was isst man traditionell in vielen deutschen Familien am Heiligabend?",
      answerOptions: [
        { answerText: "Fondue", isCorrect: false },
        { answerText: "Würstchen mit Kartoffelsalat", isCorrect: true },
        { answerText: "Braten mit Knödeln", isCorrect: false },
        { answerText: "Raclette", isCorrect: false },
      ],
      explanation: "Dieses Gericht ist schnell zubereitet und gehört in vielen deutschen Familien zur Tradition des Heiligabends."
    },
    {
      questionText: "Wie viel Geld gibt ein durchschnittlicher Deutscher für Weihnachtsgeschenke aus (Erhebung 2023)?",
      answerOptions: [
        { answerText: "200 Euro", isCorrect: false },
        { answerText: "300 Euro", isCorrect: true },
        { answerText: "450 Euro", isCorrect: false },
        { answerText: "600 Euro", isCorrect: false },
      ],
      explanation: "Laut einer Statista-Umfrage aus dem Jahr 2023 liegt der Durchschnitt bei etwa 300 Euro pro Person für Weihnachtsgeschenke."
    },
    {
      questionText: "Warum hat das Christkind das letzte Deloitte-Assessment nicht bestanden?",
      answerOptions: [
        { answerText: "Es konnte kein PowerPoint mit Glitzer-Effekt erstellen.", isCorrect: false },
        { answerText: "Es hat den \"Delivery Date\" nicht eingehalten.", isCorrect: false },
        { answerText: "Es hat keine belastbaren KPIs für \"Wunschlisten-Optimierung\" geliefert.", isCorrect: true },
        { answerText: "Es hat zu viele Engel als Ressourcen eingeplant.", isCorrect: false },
      ],
      explanation: "Natürlich nur Spaß – wir wissen, dass das Christkind eine Spitzenleistung abliefern würde, wenn es ein Berater wäre! 😊"
    },
    {
      questionText: "Wo hat unser Steffen studiert?",
      answerOptions: [
        { answerText: "In München – wegen der Weißwurstpausen.", isCorrect: false },
        { answerText: "In Köln – um den Karneval zu optimieren.", isCorrect: false },
        { answerText: "In Heidelberg – zwischen Philosophenweg und PowerPoint.", isCorrect: false },
        { answerText: "In Bayreuth – zwischen Bratwurst und Bier.", isCorrect: true },
      ],
      explanation: "Steffen hat in Bayreuth studiert, bekannt für seine Bratwurst und das berühmte Wagner-Festival."
    },
  ];
  
  export default questions;
  
  