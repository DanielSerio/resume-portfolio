-- Insert initial skill-employer experience relationships
-- This associates all skills with all employer experiences as a starting point
INSERT INTO public.skill_employer_experience (skill_id, employer_experience_id)
SELECT s.id, e.id
FROM public.skill s
CROSS JOIN public.employer_experience e;