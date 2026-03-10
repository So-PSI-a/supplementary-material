<template>
    <div class="custom-card prose max-w-none">
        <p class="mb-8 border-l-4 border-orange-500 bg-blue-50 py-2 pl-4 text-lg not-prose">
            Das Handout und die Auseinandersetzung mit der Privacy Range sollen helfen,
            <strong>im Webbrowser</strong> <strong>erkennbare</strong>
            <strong>Datenschutzprobleme</strong> zu finden. Probleme auf der
            Serverseite sind kein Bestandteil der Trainingsumgebung und des Handouts.
        </p>

        <section class="mb-12">
            <h2 class="border-b pb-2">Was sind personenbezogene Daten?</h2>
            <p>Definition nach Art. 4 Nr. 1 DSGVO:</p>
            <blockquote>
                „(...) alle Informationen, die sich auf eine identifizierte oder
                identifizierbare natürliche Person beziehen; als identifizierbar wird
                eine natürliche Person angesehen, die direkt oder indirekt,
                insbesondere mittels
                <strong>Zuordnung zu einer Kennung</strong> wie einem Namen, zu einer
                Kennnummer, zu Standortdaten, zu einer Online-Kennung (...),
                <strong>identifiziert werden kann</strong>."
            </blockquote>
            <p>
                Auch IP-Adressen können demnach personenbezogene Daten sein. Sind auf
                einer Webseite
                <strong class="text-red-600">Tools von Drittanbietern</strong>
                eingebunden, wird die IP-Adresse des Nutzers auch an den Drittanbieter
                übertragen. Solche Tools können etwa Videos, Karten oder Formulare
                sein.
            </p>
            <p>
                Wer darüber bestimmt, welche personenbezogenen Daten wie und wofür
                (sog. „Mittel und Zwecke") verarbeitet werden, ist sog.
                Verantwortliche und hat datenschutzrechtliche Pflichten u.a. aus der
                DSGVO zu erfüllen, etwa die Grundsätze der Verarbeitung
                personenbezogener Daten („Datenschutzgrundsätze").
            </p>
        </section>

        <section class="mb-12">
            <h2 class="border-b pb-2">
                Datenschutzgrundsätze (Art. 5 DSGVO) + Praxisbeispiel
            </h2>
            <ul class="space-y-4 pl-0 list-none">
                <li class="border-l-4 border-green-500 pl-3">
                    <strong class="text-xl text-green-700">Rechtmäßigkeit</strong>
                    <p class="ml-2 mt-1">
                        Jede Datenverarbeitung bedarf einer Rechtsgrundlage nach Art.
                        6 Abs. 1 DSGVO (siehe Punkt
                        <em>Rechtsgrundlagen</em>), z.B. die Erfüllung eines Vertrags.
                    </p>
                </li>
                <li class="border-l-4 border-green-500 pl-3">
                    <strong class="text-xl text-green-700"
                        >Fairness & Transparenz</strong
                    >
                    <p class="ml-2 mt-1">
                        Betroffene müssen nachvollziehen können, was mit ihren Daten
                        geschieht, z.B. durch eine verständliche, umfassende und
                        leicht zugängliche Datenschutzerklärung.
                    </p>
                </li>
                <li class="border-l-4 border-green-500 pl-3">
                    <strong class="text-xl text-green-700">Zweckbindung</strong>
                    <p class="ml-2 mt-1">
                        Daten dürfen nur für klar festgelegte Zwecke genutzt werden,
                        z.B. darf eine E-Mail zur Versandbestätigung nicht für den
                        Newsletterversand zweckentfremdet werden.
                    </p>
                </li>
                <li class="border-l-4 border-green-500 pl-3">
                    <strong class="text-xl text-green-700">Datenminimierung</strong>
                    <p class="ml-2 mt-1">
                        Es dürfen nur die für den jeweiligen Zweck notwendigen Daten
                        erhoben werden, z.B. ist ein Geburtsdatum für eine Bestellung,
                        bei der das Alter keine Rolle spielt, nicht erforderlich.
                    </p>
                </li>
                <li class="border-l-4 border-green-500 pl-3">
                    <strong class="text-xl text-green-700">Richtigkeit</strong>
                    <p class="ml-2 mt-1">
                        Daten müssen sachlich richtig und auf dem neuesten Stand sein,
                        z.B. durch eine regelmäßige Abfrage bei den Betroffenen, wenn
                        Daten längere Zeit unverändert gespeichert wurden.
                    </p>
                </li>
                <li class="border-l-4 border-green-500 pl-3">
                    <strong class="text-xl text-green-700"
                        >Speicherbegrenzung</strong
                    >
                    <p class="ml-2 mt-1">
                        Daten müssen gelöscht oder anonymisiert werden, sobald der
                        Zweck erfüllt ist, z.B. das automatische Löschen von
                        Mail-Adressen zur Gewinnspielteilnahme nach Ablauf des
                        Spielzeitraums.
                    </p>
                </li>
                <li class="border-l-4 border-green-500 pl-3">
                    <strong class="text-xl text-green-700"
                        >Integrität & Vertraulichkeit</strong
                    >
                    <p class="ml-2 mt-1">
                        Daten müssen korrekt, sicher und geschützt verarbeitet werden,
                        z.B. durch verschlüsselte Passwortspeicherung, regelmäßige
                        Backups und Zugriffskontrollen.
                    </p>
                </li>
            </ul>
        </section>

        <section class="mb-12">
            <h2 class="border-b pb-2">Rechtsgrundlagen</h2>
            <p>
                Für jede Verarbeitung muss die Verantwortliche eine der folgenden
                Rechtsgrundlagen vorweisen:
            </p>
            <dl class="space-y-4">
                <div>
                    <dt class="text-xl font-bold text-purple-700">
                        a) Einwilligung
                    </dt>
                    <dd class="ml-2 border-l-2 border-purple-300 pl-2">
                        Die Einwilligung basiert auf einer freiwilligen und informierten
                        Zustimmung des Betroffenen – er darf nicht dazu gezwungen werden.
                        Sie muss zudem klar und deutlich und konkret auf die betreffenden
                        Daten bezogen sein. Verantwortliche müssen die Einwilligung
                        nachweisen können.
                    </dd>
                </div>
                <div>
                    <dt class="text-xl font-bold text-purple-700">
                        b) Vertragserfüllung
                    </dt>
                    <dd class="ml-2 border-l-2 border-purple-300 pl-2">
                        Bei Verarbeitungen, die zur Vertragserfüllung erforderlich sind,
                        bedarf es keiner Zustimmung – z.B. die Weitergabe der Adresse zur
                        Warenzustellung an ein Paketunternehmen.
                    </dd>
                </div>
                <div>
                    <dt class="text-xl font-bold text-purple-700">
                        c) Rechtliche Verpflichtung
                    </dt>
                    <dd class="ml-2 border-l-2 border-purple-300 pl-2">
                        Eine Verarbeitung ist erforderlich, weil ein Gesetz oder eine
                        andere Rechtsnorm es vorschreibt, z.B. die gesetzlich
                        verpflichtende Aufbewahrung von Rechnungs- und Zahlungsdaten über
                        einen bestimmten Zeitraum bei einem Online-Shop.
                    </dd>
                </div>
                <div>
                    <dt class="text-xl font-bold text-purple-700">
                        d) Lebenswichtige Interessen
                    </dt>
                    <dd class="ml-2 border-l-2 border-purple-300 pl-2">
                        Eine Verarbeitung ist rechtmäßig, wenn sie erfolgt, um Leben oder
                        Gesundheit einer Person zu schützen.
                    </dd>
                </div>
                <div>
                    <dt class="text-xl font-bold text-purple-700">
                        e) Öffentliche Aufgabe
                    </dt>
                    <dd class="ml-2 border-l-2 border-purple-300 pl-2">
                        Erfüllt eine Behörde oder öffentliche Stelle eine gesetzliche
                        Aufgabe, ist dies eine Rechtsgrundlage für die Datenverarbeitung.
                        So muss z.B. das Einwohnermeldeamt Daten wie Name und Adresse
                        verarbeiten.
                    </dd>
                </div>
                <div>
                    <dt class="text-xl font-bold text-purple-700">
                        f) Berechtigtes Interesse
                    </dt>
                    <dd class="ml-2 border-l-2 border-purple-300 pl-2">
                        Betrugsverhinderung oder IT-Sicherheit – Verantwortliche können
                        eigene berechtigte Interessen, aber auch Interessen Dritter
                        anführen, die eine Verarbeitung auf dieser Rechtsgrundlage
                        rechtfertigen. Dabei muss eine Interessensabwägung mit den
                        Interessen der Betroffenen erfolgen.
                    </dd>
                </div>
            </dl>
        </section>

        <section class="mb-12">
            <h2 class="border-b pb-2">
                Transparenzgebot und Informationspflichten
            </h2>
            <p>
                Zur Erfüllung des Transparenzgebots müssen Verantwortliche gem.
                <strong class="text-indigo-600">Art. 13 DSGVO</strong> eine Reihe an
                Informationen bereitstellen:
            </p>
            <ul class="space-y-3">
                <li>
                    Name und Kontaktdaten der Verantwortlichen sowie ggf.
                    Kontaktdaten des Datenschutzbeauftragten
                </li>
                <li>
                    Zwecke und die Rechtsgrundlage für die jeweilige Verarbeitung
                </li>
                <li>Die beabsichtigte Speicherdauer der Daten</li>
                <li>
                    Empfänger der personenbezogenen Daten (inkl. Auftragsverarbeiter;
                    wenn nicht bekannt, Kategorien der Empfänger)
                </li>
                <li>
                    Die Betroffenenrechte, einschließlich des Rechts auf Beschwerde
                    bei einer Datenschutz-Aufsichtsbehörde.
                </li>
                <li>
                    Falls zutreffend: Übermittlung personenbezogener Daten an
                    Drittstaten
                </li>
                <li>
                    Falls zutreffend: Automatisierte Entscheidungsfindung (ohne
                    menschliches Eingreifen, z.B. automatisierte Vorauswahl durch
                    Lebenslauf-Scan bei einem Bewerbungsportal) muss angegeben werden,
                    inkl. Information über die Auswirkungen für die Betroffenen.
                </li>
            </ul>
        </section>

        <section class="mb-12">
            <h2 class="border-b pb-2">Betroffenenrechte und Best Practices</h2>
            <ul class="space-y-6 list-none pl-0">
                <li class="rounded-lg border bg-yellow-50 p-4">
                    <strong class="text-xl text-yellow-800">Auskunft</strong>:
                    Nutzer können jederzeit erfahren, welche Daten über sie gespeichert
                    sind.
                    <p class="mt-2 italic text-gray-600">
                        <span class="font-semibold">Best Practice:</span> Eine Social
                        Media Plattform ermöglicht es den Nutzern, eine Kopie aller durch
                        die Plattform verarbeiteten personenbezogenen Daten
                        herunterzuladen.
                    </p>
                </li>
                <li class="rounded-lg border bg-yellow-50 p-4">
                    <strong class="text-xl text-yellow-800">Berichtigung</strong>:
                    Fehlerhafte oder veraltete Daten können korrigiert werden.
                    <p class="mt-2 italic text-gray-600">
                        <span class="font-semibold">Best Practice:</span> Der Nutzer
                        eines Versandhandels kann nach einem Umzug die Adresse in seinem
                        Account selbstständig ändern, diese Änderung wird vom System in
                        allen betroffenen Bereichen übernommen.
                    </p>
                </li>
                <li class="rounded-lg border bg-yellow-50 p-4">
                    <strong class="text-xl text-yellow-800">Löschung</strong>: Nutzer
                    können verlangen, dass ihre Daten gelöscht werden („Recht auf
                    Vergessenwerden"). Ausnahmen sind möglich (z. B. rechtliche
                    Aufbewahrungspflichten).
                    <p class="mt-2 italic text-gray-600">
                        <span class="font-semibold">Best Practice:</span> Ein Nutzer
                        löscht seinen Account auf einer Kleinanzeigenplattform. Das
                        öffentliche Profil sowie Accountname und E-Mail-Adresse werden
                        auf der gesamten Plattform gelöscht oder anonymisiert, auch in
                        Chatverläufen mit anderen Nutzern.
                    </p>
                </li>
                <li class="rounded-lg border bg-yellow-50 p-4">
                    <strong class="text-xl text-yellow-800">Einschränkung</strong>:
                    Während der Einschränkung dürfen die betreffenden Daten nur noch
                    gespeichert, aber nicht mehr anderweitig verarbeitet werden.
                    <p class="mt-2 italic text-gray-600">
                        <span class="font-semibold">Best Practice:</span> Eine Nutzerin
                        widerspricht der Analyse von IP-Adressen und Cookies zur
                        Reichweitenmessung durch den Webseitenbetreiber. Bis zur Klärung
                        dürfen die Rohdaten weiter gespeichert, aber nicht mehr für
                        Statistikberichte genutzt werden.
                    </p>
                </li>
                <li class="rounded-lg border bg-yellow-50 p-4">
                    <strong class="text-xl text-yellow-800">Widerspruch</strong>:
                    Nutzer können der Verarbeitung widersprechen, sofern sie auf
                    öffentlichem Interesse, Ausübung öffentlicher Gewalt oder
                    berechtigtem Interesse basiert. Gilt auch für Direktwerbung.
                    <p class="mt-2 italic text-gray-600">
                        <span class="font-semibold">Best Practice:</span> Eine
                        Navigations-App verarbeitet Standort- und Bewegungsdaten ihrer
                        Nutzer, um aggregierte Informationen an die Verkehrsbehörde zur
                        Verkehrsplanung bereitzustellen. Nach Widerspruch eines Nutzers
                        blockiert die App seine Standortdaten für die Weitergabe an die
                        Verkehrsbehörde.
                    </p>
                </li>
                <li class="rounded-lg border bg-yellow-50 p-4">
                    <strong class="text-xl text-yellow-800"
                        >Datenübertragbarkeit/Datenportabilität</strong
                    >: Nutzer können ihre Daten in einem maschinenlesbaren Format
                    anfordern und an einen anderen Anbieter übertragen.
                    <p class="mt-2 italic text-gray-600">
                        <span class="font-semibold">Best Practice:</span> Eine Nutzerin
                        wechselt ihre Sport-Tracking-App und fordert die
                        Datenübertragung ein. Sie erhält ihre Trainingsdaten in einem
                        gängigen maschinenlesbaren Format und kann diese in die neue
                        Anwendung importieren.
                    </p>
                </li>
            </ul>
        </section>

        <section class="mb-12">
            <h2 class="border-b pb-2">
                Cookies und Gestaltung von Einwilligungstools (Consent Management)
            </h2>
            <ul class="space-y-3">
                <li>
                    Einwilligung muss
                    <strong>freiwillig</strong> und
                    <strong>informiert</strong> erfolgen.
                </li>
                <li>
                    Ablehnung muss
                    <strong>auf erster Ebene</strong> möglich sein (Auffassung der
                    Aufsichtsbehörden).
                </li>
                <li>
                    <strong class="text-red-700">Vorausgewählte Checkboxen</strong>
                    sind
                    <strong class="text-red-700">keine gültige Einwilligung</strong>
                    (EuGH-Urteil „Planet49").
                </li>
                <li>
                    <strong class="text-green-700">Keine Einwilligung nötig</strong>
                    für
                    <strong class="text-green-700"
                        >technisch notwendige Cookies</strong
                    >
                    für ausdrücklich gewünschte Dienste, z.B. Login oder Speicherung
                    von Warenkorb-Inhalten.
                </li>
                <li>
                    <strong class="text-red-700">Einwilligung nötig</strong> für
                    <strong class="text-red-700">funktionale Cookies,</strong> die
                    zusätzliche Funktionen bieten, aber nicht essenziell für die
                    Funktionsweise der Website sind.
                </li>
            </ul>
        </section>
    </div>
</template>

<script lang="ts" setup>
useHead({ title: 'GDPR Handout' });
</script>
