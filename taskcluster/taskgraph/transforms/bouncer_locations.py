# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at http://mozilla.org/MPL/2.0/.
from __future__ import absolute_import, print_function, unicode_literals

import logging

from taskgraph.transforms.base import TransformSequence
from taskgraph.util.schema import resolve_keyed_by

logger = logging.getLogger(__name__)


transforms = TransformSequence()


@transforms.add
def make_task_worker(config, jobs):
    for job in jobs:
        resolve_keyed_by(
            job, 'worker-type', item_name=job['name'], project=config.params['project']
        )
        resolve_keyed_by(
            job, 'scopes', item_name=job['name'], project=config.params['project']
        )
        resolve_keyed_by(
            job, 'bouncer-products', item_name=job['name'], project=config.params['project']
        )

        job['worker']['bouncer-products'] = job['bouncer-products']
        del job['bouncer-products']

        # chain the breakpoint as dependency to this task
        dependencies = {}
        for dep_task in config.kind_dependencies_tasks:
            dependencies[dep_task.kind] = dep_task.label

        job.setdefault('dependencies', {}).update(dependencies)
        yield job
