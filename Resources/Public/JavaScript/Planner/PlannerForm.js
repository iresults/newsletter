Ext.ns("Ext.ux.TYPO3.Newsletter.Module");

// turn on validation errors beside the field globally
Ext.form.Field.prototype.msgTarget = 'side';
	
Ext.ux.TYPO3.Newsletter.Module.PlannerForm = Ext.extend(Ext.form.FormPanel, {

	initComponent: function() {
		var config = {
			title: 'My newsletter form',
			height: 700,
			//			standardSubmit: true,
			clientValidation: false,
			
			items: [
			{
				xtype: 'tabpanel',
				activeTab: 1,
				items : [
				{
					height: 500,
					// Fieldset in Column 1
					xtype:'fieldset',
					title: 'Status',
	
					items:[{
						height: 500,
						xtype: 'dataview',
						store: Ext.StoreMgr.get('Tx_Newsletter_Domain_Model_PlannedNewsletter'),
						emptyText: 'No text to display',
						tpl: new Ext.XTemplate(
							'<tpl for=".">',
							'<div>',
							'<h2>Errors</h2>{errors}',
							'<h2>Warnings</h2>{warnings}',
							'<h2>Infos</h2>{infos}',
							'</div>',
							'</tpl>'
							)
					}]
				},

				{
					title: 'Tests & Settings',
					xtype: 'panel',
					height: 700,
					items: 
					[
					{
						// Fieldset in Column 1
						xtype:'fieldset',
						columnWidth: 0.5,
						title: 'Sender',
						collapsible: true,
						titleCollapse: true,
						// collapsed: true, // fieldset initially collapsed

						defaults: {
							anchor: '-20'
						},// leave room for error icon
						defaultType: 'textfield',
						items: 
						[
						{
							fieldLabel: 'Name',
							name: 'senderName',
							allowBlank:false
						},
						{
							fieldLabel: 'Email address',
							name: 'senderEmail',
							allowBlank:false
						}
						]
					},
					{
						// Fieldset in Column 1
						xtype:'fieldset',
						columnWidth: 0.5,
						title: 'Testing',
						collapsible: true,
						titleCollapse: true,
						collapsed: true, // fieldset initially collapsed
						autoHeight:true,
						defaults: {
							anchor: '-20'  // leave room for error icon
						},

						defaultType: 'textfield',
						items: [{
							xtype: 'panel',
							anchor: '100%',
							title: 'list of recipients ...',
							frame: true,
							height: 100
						},
						{
							xtype: 'button',
							text: 'Sent test emails',
							handler: function(){
								alert("email just sent :-)");
							}
						}
						]
					},
					{
						// Fieldset in Column 1
						xtype:'fieldset',
						columnWidth: 0.5,
						title: 'Advanced settings',
						collapsible: true,
						titleCollapse: true,
						//collapsed: true, // fieldset initially collapsed
						autoHeight:true,
						defaults: {
							anchor: '-20'  // leave room for error icon
						},

						defaultType: 'textfield',
						items:
						[
						{
							xtype: 'combo',
							fieldLabel: 'Bounce account',
							name: 'uidBounceAccount',
							store: Ext.StoreMgr.get('Tx_Newsletter_Domain_Model_BounceAccount'),
							displayField: 'fullName',
							valueField: '__identity',
							mode: 'local',
							forceSelection: true,
							triggerAction: 'all',
							selectOnFocus: true,
							autoSelect: true,
							typeAhead: false
						},
						{
							xtype: 'combo',
							fieldLabel: 'Plain text method',
							name: 'plainConverter',
							allowBlank:false,
							store: new Ext.data.ArrayStore({
								idIndex: 0,
								fields: ['value', 'name'],
								data: [
									['Tx_Newsletter_Domain_Model_PlainConverter_Builtin', Ext.ux.TYPO3.Newsletter.Language.tx_newsletter_domain_model_newsletter_plain_converter_builtin],
									['Tx_Newsletter_Domain_Model_PlainConverter_Template', Ext.ux.TYPO3.Newsletter.Language.tx_newsletter_domain_model_newsletter_plain_converter_template],
									['Tx_Newsletter_Domain_Model_PlainConverter_Lynx', Ext.ux.TYPO3.Newsletter.Language.tx_newsletter_domain_model_newsletter_plain_converter_lynx]
								]
							}),
							value: 0,
							mode:'local',
							forceSelection:true,
							triggerAction : 'all',
							valueField: 'value',
							displayField: 'name'
						},
						{
							xtype: 'combo',
							fieldLabel: 'Repeat periodically',
							name: 'repetition',
							store: new Ext.data.ArrayStore({
								idIndex: 0,
								fields: ['value', 'name'],
								data: [
									[0, Ext.ux.TYPO3.Newsletter.Language.tx_newsletter_domain_model_newsletter_repetition_none],
									[1, Ext.ux.TYPO3.Newsletter.Language.tx_newsletter_domain_model_newsletter_repetition_daily],
									[2, Ext.ux.TYPO3.Newsletter.Language.tx_newsletter_domain_model_newsletter_repetition_weekly],
									[3, Ext.ux.TYPO3.Newsletter.Language.tx_newsletter_domain_model_newsletter_repetition_biweekly],
									[4, Ext.ux.TYPO3.Newsletter.Language.tx_newsletter_domain_model_newsletter_repetition_monthly],
									[5, Ext.ux.TYPO3.Newsletter.Language.tx_newsletter_domain_model_newsletter_repetition_quarterly],
									[6, Ext.ux.TYPO3.Newsletter.Language.tx_newsletter_domain_model_newsletter_repetition_semiyearly],
									[7, Ext.ux.TYPO3.Newsletter.Language.tx_newsletter_domain_model_newsletter_repetition_yearly]
								]
							}),
							value: 0,
							mode:'local',
							forceSelection:true,
							triggerAction : 'all',
							valueField: 'value',
							displayField: 'name'

						},
						{
							xtype: 'checkbox',
							fieldLabel: 'Detect opened emails',
							name: 'injectOpenSpy'           
						},
						{
							xtype: 'checkbox',
							fieldLabel: 'Detect clicked links',
							name: 'injectLinksSpy'          
						}
						]
					}
					]
				}

				,{
					// Fieldset in Column 2 - Panel inside
					xtype:'panel',
					title: 'Planning', // title, header, or checkboxToggle
					header: false, // Do not want double title in tab + panel
					// creates fieldset header
					autoHeight:true,
					layout:'anchor',
					items :[
					{
						xtype: 'fieldset',
						title: 'Recipients', 
						items: [{
							xtype: 'panel',
							anchor: '100%',
							title: 'list of recipients ...',
							frame: true,
							height: 100
						}]
					}
					,
					{
						xtype: 'fieldset',
						title: 'Time to send',
						items: [
						{
							xtype: 'datepicker',
							title: 'Date to send',
							name: 'beginTime'
						},
						{
							xtype: 'timefield',
							title: 'Time to send',
							name: 'beginTime'
						}
						]
					}
					]
				}
				]
			}
			],


			listeners: 
			{
				'afterrender': function(formPanel){
					formPanel.getForm().doAction('directload');
				}
			}
		};

		Ext.apply(this, config);
		Ext.ux.TYPO3.Newsletter.Module.PlannerForm.superclass.initComponent.call(this);
	},


	/**
 * Submits the form. Called after Submit buttons is clicked
 * 
 * @private
 */
	submit:function() {
		//alert("Oui :)");
		
		var fp = this.ownerCt.ownerCt,
		form = fp.getForm();
		console.log(form);
		form.submit({
			clientValidation: false
		});
		console.log(this.url);
		return; 
				
		this.getForm().submit({
			url:this.url,
			scope:this
		});
	}
	
});
Ext.reg('Ext.ux.TYPO3.Newsletter.Module.PlannerForm', Ext.ux.TYPO3.Newsletter.Module.PlannerForm);