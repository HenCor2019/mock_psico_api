import { CandidateStatus } from '@common/enums';

export const StageCouple = {
  Selection: CandidateStatus.NOT_PROCESSED,
  'Psychometric tests': CandidateStatus.IN_PROCESS,
  'Oral interviews': CandidateStatus.IN_PROCESS,
  'Tecnical interviews': CandidateStatus.IN_PROCESS,
};
