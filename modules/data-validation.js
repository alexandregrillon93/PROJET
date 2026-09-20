const APP_DATA_VERSION = 18;
function validateImportBundle(bundle) {
    if (!bundle || typeof bundle !== "object") return { ok: false, message: "Le fichier n'est pas un objet JSON." };
    if (bundle.app && bundle.app !== "Muscu Coach Pro") return { ok: false, message: "Ce fichier ne vient pas de Muscu Coach Pro." };
    if (Number(bundle.version) > APP_DATA_VERSION) return { ok: false, message: "Cette sauvegarde vient d'une version plus récente." };
    const snapshot = bundle.customProgram;
    if (!snapshot || !Array.isArray(snapshot.program) || !snapshot.program.length || !snapshot.answers || typeof snapshot.answers !== "object") {
        return { ok: false, message: "Le programme ou les réponses sont manquants." };
    }
    if (snapshot.program.some(day => !day || typeof day !== "object" || !Array.isArray(day.exercises))) {
        return { ok: false, message: "La structure du programme est invalide." };
    }
    const arrays = ["trainingLog", "bodyweightLog", "calorieLog", "freestyleLog", "cycleFeedback"];
    if (arrays.some(key => bundle[key] != null && !Array.isArray(bundle[key]))) return { ok: false, message: "Une liste de données est invalide." };
    if (bundle.sessions != null && (typeof bundle.sessions !== "object" || Array.isArray(bundle.sessions))) return { ok: false, message: "L'historique des séances est invalide." };
    return { ok: true };
}
