import chalk from 'chalk';

const separator = '| ';
const formatMessages = (messages) => JSON.stringify(messages, null, 2).replace(/\\n/g, separator);

const dateAndTime = () => {
	const date = new Date();
	const time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
	return chalk.cyan(`${date.getDate()}/${date.getMonth()}/${date.getFullYear()} ${time}`);
};

const colors = {
	info: chalk.blue,
	error: chalk.red
};

const getMessage = (label, message, type) => {
	return `______________________________________________________________
	\n${dateAndTime()} ${colors[type](`${type.toUpperCase()} - ${label} \n${formatMessages(message)}`)}
	\n______________________________________________________________`;
};

const logger =
	process.env.NODE_ENV === 'development'
		? {
				info: ({ label, message }) => {
					console.log(getMessage(label, message, 'info'));
				},
				error: ({ label, message }) => {
					console.log(getMessage(label, message, 'error'));
				}
		  }
		: {
				info: () => {},
				error: () => {}
		  };

export default logger;
