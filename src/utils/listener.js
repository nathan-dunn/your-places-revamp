import moment from 'moment';

export default (port, db, nodeEnv) => {
  const nodeMessage = `  The NODE_ENV is: ${nodeEnv}  `;
  const serverMessage = `  Server listening on PORT: ${port}  `;
  const dbMessage = `  Using database: ${db}  `;
  const timestamp = `  Timestamp: ${moment().format('MMMM Do YYYY, h:mm:ss a')}`;

  const divider = '*'.repeat(
    Math.max(timestamp.length, nodeMessage.length, serverMessage.length, dbMessage.length)
  );

  const message = `
  ${divider}
  ${nodeMessage}
  ${serverMessage}
  ${dbMessage}
  ${timestamp}
  ${divider}
  `;
  console.info(message);
};
