
import { ContactFormData } from '@/components/ContactForm/ContactForm';

export async function sendEmail(data: ContactFormData) {
  const apiEndpoint = '/api/email';
  try {
    const response = await fetch(apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const contentType = response.headers.get('content-type');
    if (!response.ok) {
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Réponse non valide du serveur. Attendu JSON.');
      }
      const errorData = await response.json();
      throw new Error(errorData.error || 'Erreur lors de l\'envoi de l\'email');
    }
    if (contentType && contentType.includes('application/json')) {
      const responseData = await response.json();
      return responseData;
    } else {
      throw new Error('Réponse inattendue du serveur. JSON attendu.');
    }
  } catch (error: any) {
    console.error("Erreur lors de l'envoi de l'e-mail:", error.message);
    alert(error.message || 'Erreur inconnue');
    throw error;
  }
}