import React, { Fragment } from 'react';
import { createRoot } from 'react-dom/client';

import { Experiment, Variation } from './src';

/* eslint-disable no-console */
const Example = () => (
	<Fragment>
		<h1>Basic Persisted Experiment</h1>
		<Experiment id="persisted-experiment" onParticipate={console.log}>
			<Variation id="var-1">
				<h2>Hello, World!</h2>
			</Variation>
			<Variation id="var-2">
				<h2>HELLO!</h2>
			</Variation>
			<p>Static experiment 1 content</p>
		</Experiment>

		<h1>Experiment with mutiple sections for each variation</h1>
		<Experiment id="sectioned-experiment" onParticipate={console.log}>
			<Variation id="var-1">
				<h2>Hello, World!</h2>
			</Variation>
			<Variation id="var-2">
				<h2>HELLO!</h2>
			</Variation>

			<p>Static content common to both variations</p>

			<Variation id="var-1">
				<p>This belongs to variation 1 and matches the "Hello, World!" headline</p>
			</Variation>

			<Variation id="var-2">
				<p>This belongs to variation 2 and matches the "HELLO!" headline</p>
			</Variation>
		</Experiment>

		<h1>Basic Session-only experiment</h1>
		<Experiment session id="session-experiment" onParticipate={console.log}>
			<Variation id="var-1">
				<h2>Hello, Session!</h2>
			</Variation>
			<Variation id="var-2">
				<h2>SESSION!</h2>
			</Variation>
			<p>Static experiment 2 content</p>
		</Experiment>

		<h1>Nested Experiments for mutually exclusive testing</h1>
		<Experiment session id="parent-experiment" onParticipate={console.log}>
			<Variation id="var-1">
				<Experiment session id="nested-experiment-1" onParticipate={console.log}>
					<Variation id="var-1">
						<h2>Hello, Nested 1 Var 1!</h2>
					</Variation>
					<Variation id="var-2">
						<h2>NESTED 1 VAR 2!</h2>
					</Variation>
				</Experiment>
			</Variation>
			<Variation id="var-2">
				<Experiment session id="nested-experiment-2" onParticipate={console.log}>
					<Variation id="var-1">
						<h2>Hello, Nested 2 Var 1!</h2>
					</Variation>
					<Variation id="var-2">
						<h2>NESTED 2 VAR 2!</h2>
					</Variation>
				</Experiment>
			</Variation>
		</Experiment>

		<p>Static page content</p>
	</Fragment>
);
/* eslint-enable */

const div = document.createElement('div');
div.id = 'app-root';
document.querySelector('body')?.append(div);

const container = document.querySelector('#app-root');
container && createRoot(container).render(<Example/>);
