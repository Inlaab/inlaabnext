// Rate limiting deshabilitado temporalmente
// Se implementará en una fase posterior del proyecto

export const ratelimit = {
  limit: async () => ({
    success: true,
    limit: 100,
    remaining: 100,
    reset: 0,
  }),
};
