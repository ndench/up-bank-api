export interface Pong {
  meta: {
    /** The unique identifier of the authenticated customer. */
    id: string;
    /** A cute emoji that represents the response status. */
    statusEmoji: string;
  };
}
