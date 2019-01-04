import { GenericModel } from 'src/app/models/generic-model';
import { User } from 'src/app/models/user';

export class GenericDbService {
  constructor() {}

  /**
   * Utility method to "tag" created items with createdOn, and createdBy tags.
   * @param modelToCreate the model being created
   * @param user the user who is doing the creating
   */
  protected tagModel(modelToCreate: GenericModel, user: User): void {
    if (!modelToCreate.createdOn) {
      modelToCreate.createdOn = new Date();
    }
    if (!modelToCreate.createdBy) {
      modelToCreate.createdBy = user.uid;
    }
  }
}
