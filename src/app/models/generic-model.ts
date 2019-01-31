export interface GenericModel {
  /**
   * All models have an id.
   */
  uid: string;
  /**
   * The date this model was created on
   */
  createdOn: Date;
  /**
   * The id of the user who created this model
   */
  createdBy: string;
  /**
   * List of searchable strings
   */
  tags?: string[];
}
