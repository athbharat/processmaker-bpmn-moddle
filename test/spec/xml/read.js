'use strict';


var readFile = require('../../helper').readFile,
  createModdle = require('../../helper').createModdle;


describe('read', function() {

    describe('load processmaker extensions', function() {

        var moddle;

        beforeEach(function() {
            moddle = createModdle();
        });

        it('Load Message', function(done) {

            // given
            var xml = readFile('test/fixtures/xml/processmaker-message.part.bpmn');

            // when
            moddle.fromXML(xml, 'bpmn:Message', function(err, task) {
                // then
                expect(task).to.jsonEqual({
                    '$type': 'bpmn:Message',
                    'id': 'order',
                    'name': 'Order',
                    'payload': '{order}'
                });
                done(err);
            });
        });

        it('Load Script Task', function(done) {

            // given
            var xml = readFile('test/fixtures/xml/processmaker-script-task.part.bpmn');

            // when
            moddle.fromXML(xml, 'bpmn:ScriptTask', function(err, task) {
                // then
                expect(task).to.jsonEqual({
                    '$type': 'bpmn:ScriptTask',
                    'id': 'script',
                    'name': 'Script Task',
                    'scriptRef': 'script-id',
                    'scriptVersion': '10',
                    'config': '{}',
                });
                done(err);
            });
        });

        it('Load Assignment Task', function(done) {

            // given
            var xml = readFile('test/fixtures/xml/processmaker-assignment-task.part.bpmn');

            // when
            moddle.fromXML(xml, 'bpmn:Task', function(err, task) {
                // then
                expect(task).to.jsonEqual({
                    '$type': 'bpmn:Task',
                    id: 'group_task',
                    name: 'Group Task',
                    assignment: 'group',
                    assignedGroups: '1',
                });
                done(err);
            });
        });

        it('Load Service Task', function(done) {

            // given
            var xml = readFile('test/fixtures/xml/processmaker-service-task.part.bpmn');

            // when
            moddle.fromXML(xml, 'bpmn:ServiceTask', function(err, task) {
                // then
                expect(task).to.jsonEqual({
                    '$type': 'bpmn:ServiceTask',
                    'id': 'service',
                    'name': 'Service Task',
                    'implementation': 'EchoConnector',
                    'implementationVersion': '10',
                    'config': '{}',
                });
                done(err);
            });
        });

        it('Load Task', function(done) {

            // given
            var xml = readFile('test/fixtures/xml/processmaker-task-screen.part.bpmn');

            // when
            moddle.fromXML(xml, 'bpmn:Task', function(err, task) {
                // then
                expect(task).to.jsonEqual({
                    '$type': 'bpmn:Task',
                    'completionQuantity': 1,
                    'id': 'approve',
                    'isForCompensation': false,
                    'name': 'Request approval',
                    'screenRef': '420f95eb-76d8-459d-b56a-ea605bea4e3f',
                    'screenVersion': '10',
                    'dueIn': 10,
                    'notifyAfterRouting': true,
                    'notifyRequestCreator': false,
                    'startQuantity': 1
                });
                done(err);
            });
        });

        it('Load End Event', function(done) {

            // given
            var xml = readFile('test/fixtures/xml/processmaker-endEvent-screen.part.bpmn');

            // when
            moddle.fromXML(xml, 'bpmn:EndEvent', function(err, task) {
                // then
                expect(task).to.jsonEqual({
                    '$type': 'bpmn:EndEvent',
                    'id': 'endEvent',
                    'name': 'End Event',
                    'screenRef': '420f95eb-76d8-459d-b56a-ea605bea4e3f',
                    'screenVersion': '10'
                });
                done(err);
            });
        });

        it('Load assignedGroups from Task', function(done) {

            // given
            var xml = readFile('test/fixtures/xml/processmaker-assignment-groups-task.part.bpmn');

            // when
            moddle.fromXML(xml, 'bpmn:Task', function(err, task) {
                // then
                expect(task).to.jsonEqual({
                    '$type': 'bpmn:Task',
                    id: 'task',
                    name: 'Task',
                    assignment: 'group',
                    assignedGroups: '10,20',
                });
                done(err);
            });
        });

        it('Load pm:allowReassginment attribute', function(done) {

            // given
            var xml = readFile('test/fixtures/xml/processmaker-task-reasignment.part.bpmn');

            // when
            moddle.fromXML(xml, 'bpmn:Task', function(err, task) {
                // then
                expect(task).to.jsonEqual({
                    '$type': 'bpmn:Task',
                    id: 'task',
                    name: 'Task',
                    assignment: 'group',
                    assignedGroups: '99',
                    allowReassignment: true,
                });
                done(err);
            });
        });

    });

});
