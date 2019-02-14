import { DeckStudyState } from 'src/app/app-store/deck-study/deck-study.reducer';
import { DeckStudyUtilService } from './deck-study-util.service';
import { Card } from 'src/app/models/card';

describe('DeckStudyUtilService', () => {
  let service: DeckStudyUtilService;
  beforeEach(() => (service = new DeckStudyUtilService()));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  fdescribe('getNextCard', () => {
    let getRandomSpy: jasmine.Spy;
    beforeEach(() => {
      getRandomSpy = spyOn(
        DeckStudyUtilService.prototype as any,
        'getRandom'
      ).and.returnValue(0);
    });
    const testGetNextCard = (
      state: DeckStudyState,
      expected: Partial<Card>
    ) => {
      expect(service.getNextCard(state)).toEqual(expected as any);
    };
    const defaultState: DeckStudyState = {
      card: undefined,
      deck: undefined,
      group: undefined,
      flipped: false,
      previous: [],
      cards: [],
      correct: [],
      missed: [],
      skipped: []
    };
    it('returns undefined if cards is empty array', () => {
      testGetNextCard(
        {
          ...defaultState
        },
        undefined
      );
    });
    it('returns undefined, if all cards already studied', () => {
      testGetNextCard(
        {
          ...defaultState,
          cards: [{ uid: { uid: 'cardOne' } }] as any,
          missed: ['cardsOne']
        },
        undefined
      );
    });
    it('returns card not in missed', () => {
      testGetNextCard(
        {
          ...defaultState,
          cards: [{ uid: 'cardOne' }, { uid: 'cardTwo' }] as any,
          missed: ['cardOne']
        },
        {
          uid: 'cardTwo'
        }
      );
    });
    it('returns card not in skipped', () => {
      testGetNextCard(
        {
          ...defaultState,
          cards: [{ uid: 'cardOne' }, { uid: 'cardTwo' }] as any,
          skipped: ['cardTwo']
        },
        {
          uid: 'cardOne'
        }
      );
    });
    it('returns card not in correct', () => {
      testGetNextCard(
        {
          ...defaultState,
          cards: [
            { uid: 'cardOne' },
            { uid: 'cardTwo' },
            { uid: 'cardThree' }
          ] as any,
          correct: ['cardOne', 'cardThree']
        },
        {
          uid: 'cardTwo'
        }
      );
    });
    it('returns second card', () => {
      getRandomSpy.and.returnValue(1);
      testGetNextCard(
        {
          ...defaultState,
          cards: [
            { uid: 'cardOne' },
            { uid: 'cardTwo' },
            { uid: 'cardThree' }
          ] as any,
          correct: ['cardOne']
        },
        {
          uid: 'cardThree'
        }
      );
    });
  });
});
